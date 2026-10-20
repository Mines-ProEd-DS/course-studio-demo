# ProEd Course Studio

A concept demo for AI-assisted course creation by professors and instructional designers.

**[Open the demo](https://mines-proed-ds.github.io/course-studio-demo/)**

The home page links to four independent examples. Each opens with a sample already visible:

- **Plan a course:** materials and teaching goals beside a possible structure.
- **Draft a lesson:** three short lesson excerpts to browse.
- **Review together:** a paragraph, sample feedback, and a prepared revision.
- **Format for the LMS:** two layouts and a sample HTML download.

This is a static demonstration. AI examples are prepared; there is no live AI or LMS connection. Comments exist only while the feedback page is open. No API key, backend, database, or account is needed. Sample layouts have not been verified in Thought Industries.

## Run locally

Use Node.js 22.12 or later in the Node 22 line, or a newer supported release.

```sh
npm ci
npm run dev
```

For a production preview:

```sh
npm run build
npm run preview
```

Open the address printed by Vite, normally `http://127.0.0.1:4173/` for the preview.

## Tests and hosting

```sh
npm test
npm run build
```

The GitHub Actions workflow tests and builds every push to `main`, then deploys only `dist/` to GitHub Pages. It can also be run manually. Hash routes and relative asset URLs support the repository hosting path.

`src/App.tsx` contains the home page and examples. `src/render.ts` shares escaped lesson markup and template styles between the preview and download. `src/fixtures.ts` retains the selected course passages and their source records.

## Course material

The demonstration uses selected excerpts from the Mines ProEd Python course. Source records identify the original private course repository; access to that repository is not needed to run this demo. The original course and production files are not included.

Course materials retain their existing Colorado School of Mines and licensors copyright. The sample HTML download includes the full course copyright notice. Publishing this demo does not grant an additional license to those materials.
