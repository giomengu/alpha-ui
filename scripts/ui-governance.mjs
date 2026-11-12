#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const source = path.join(root, 'packages/ui/src');
const indexPath = path.join(source, 'index.js');
const registryPath = path.join(root, 'ui-registry.json');
const command = process.argv[2];
const option = (name) => { const i = process.argv.indexOf('--' + name); return i >= 0 ? process.argv[i + 1] : ''; };
const read = (p) => fs.readFileSync(p, 'utf8');
const exists = (p) => fs.existsSync(path.join(root, p));
const registry = () => JSON.parse(read(registryPath));
const exportsList = () => {
  const src = read(indexPath);
  const found = new Map();
  for (const m of src.matchAll(/export\s*\{([^}]+)\}\s*from\s*["']([^"']+)["']/gs)) {
    for (const part of m[1].split(',')) {
      const name = part.trim().split(/\s+as\s+/).pop().trim();
      if (name && name !== 'default') found.set(name, m[2]);
    }
  }
  for (const m of src.matchAll(/export\s*\*\s*from\s*["']([^"']+)["']/g)) {
    found.set('* ' + m[1], m[1]);
  }
  return found;
};
const fail = (msg) => { console.error(msg); process.exitCode = 1; };
if (command === 'list' || command === 'find' || command === 'inspect') {
  const records = registry().components;
  const query = (option('query') || option('name') || '').toLowerCase();
  const matches = records.filter((c) => command === 'list' || [c.name,c.description,c.category,...(c.keywords||[])].join(' ').toLowerCase().includes(query));
  for (const c of matches) console.log(c.name + ' [' + c.status + '] — ' + c.description + '\n  import: ' + c.import + (c.docs ? '\n  docs: ' + c.docs : ''));
  if (!matches.length) console.log('No matches. Inspect packages/ui/src/index.js before creating new components.');
} else if (command === 'validate') {
  const exports = exportsList();
  const records = registry().components;
  const names = new Set();
  for (const c of records) {
    if (names.has(c.name)) fail('Duplicate registry name: ' + c.name);
    names.add(c.name);
    if (!exports.has(c.name)) fail('Registry entry is not exported: ' + c.name);
    if (!c.description || !c.category || !c.import) fail('Missing metadata: ' + c.name);
    if (c.status === 'stable') {
      for (const field of ['docs','demo','test']) {
        if (!c[field] || !exists(c[field])) fail(c.name + ': missing ' + field + ' at ' + c[field]);
      }
    }
  }
  for (const name of exports.keys()) if (!names.has(name)) fail('Unregistered export: ' + name);
  if (!process.exitCode) console.log('Alpha UI registry valid: ' + records.length + ' entries');
} else if (command === 'create') {
  const name = option('name');
  if (!/^[A-Z][A-Za-z0-9]*$/.test(name)) { fail('Supply --name PascalCaseComponent'); }
  else {
    const data = registry();
    const all = exportsList();
    if (data.components.some(c => c.name === name) || all.has(name)) fail('Component already exists: ' + name);
    else {
      const base = 'packages/ui/src/components/' + name;
      const docs = 'docs/components/' + name + '.md';
      const demo = 'apps/demo/examples/' + name + '.jsx';
      const test = 'packages/ui/src/components/' + name + '.test.jsx';
      for (const p of [base + '.jsx',docs,demo,test]) if (exists(p)) fail('File already exists: ' + p);
      if (!process.exitCode) {
        const write = (p, value) => { const full = path.join(root,p); fs.mkdirSync(path.dirname(full),{recursive:true}); fs.writeFileSync(full,value); };
        write(base + '.jsx', `import React from 'react';\nexport default function ${name}({ children }) { return <div>{children}</div>; }\n`);
        write(docs, `# ${name}\n\nDescribe purpose, props, variants, accessibility, and when to use this component.\n`);
        write(demo, `import React from 'react';\nimport { ${name} } from '@alpha/ui';\nexport default function ${name}Example() { return <${name}>Example</${name}>; }\n`);
        write(test, `import { describe, it, expect } from 'vitest';\nimport React from 'react';\nimport { render, screen } from '@testing-library/react';\nimport ${name} from './${name}';\ndescribe('${name}', () => { it('renders children', () => { render(<${name}>Example</${name}>); expect(screen.getByText('Example')).toBeTruthy(); }); });\n`);
        fs.appendFileSync(indexPath, `\nexport { default as ${name} } from "./components/${name}";\n`);
        data.components.push({name,category:'general',description:'TODO: describe ' + name,keywords:[],import:'@alpha/ui',status:'stable',docs,demo,test});
        write('ui-registry.json',JSON.stringify(data,null,2)+'\n');
        console.log('Scaffolded ' + name + '. Complete docs, demo and tests before committing.');
      }
    }
  }
} else fail('Usage: node scripts/ui-governance.mjs <list|find|inspect|create|validate> [--query text] [--name Name]');
