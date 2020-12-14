# cra-template-dronz

My template for [Create React App](https://create-react-app.dev/docs/custom-templates/).

```
npx create-react-app foo --template dronz
```

## What it adds on top of default CRA:

- typescript
- absolute imports
- netlify redirects
- normalize.css
- styled-components
- /style folder with common global styles, common mixins, a colors file
- /components folder with Example.tsx for pasting into new components
- bundle size analysis script
- prettier, and a pre-commit git hook to apply prettier
- deletes all those CRA files you always end up deleting