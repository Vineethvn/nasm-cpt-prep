# NASM-CPT Prep

An active-recall study portal for the NASM Certified Personal Trainer (7th edition) exam. Read a lesson in plain language and exact NASM wording, then type the answer from memory — spaced repetition brings weak items back until they stick.

See [CLAUDE.md](./CLAUDE.md) for the full project spec.

## Development

```bash
npm install
npm run dev              # start dev server
npm run build             # typecheck + production build
npm run validate-content  # validate all content data files
npm run preview           # preview the production build locally
```

Installable as a PWA and works fully offline after first load. All progress is stored locally (`localStorage`); use Settings → Export/Import to back up or transfer progress.
