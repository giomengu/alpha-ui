# Alpha UI agent contract

Alpha UI is the shared React UI source of truth for AlphaNav and AlphaFoam.

Before writing UI:
1. Run `npm run ui:find -- --query "<capability>"` and inspect matching exports.
2. Reuse an existing component; extend its props or variants when reasonable.
3. Create a shared component only when the existing API cannot satisfy the need. Keep domain logic in the consuming app.
4. Run `npm run ui:create -- --name ComponentName` for any new public shared component.
5. Fill in the generated docs, demo and tests; run `npm run ui:validate`, `npm test` and `npm run build`.
6. Never manually add a new public export without its complete metadata, docs, demo and tests.

Legacy exports are indexed automatically; new exports must have a manifest record. The validator intentionally grandfathers legacy components so migration can proceed without breaking existing releases.
