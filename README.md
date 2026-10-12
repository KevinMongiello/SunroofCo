# SunRoof

To my interviewers:

Each app's README has instructions for local development: [frontend](sunroof-web/README.md) and [backend](sunroof-api/README.md).

The app is also deployed. I'll provide you with the URL so you can play with it without worrying about setting up backend keys to access the AI features.

About 90% of this project was written by hand. The other 10% used AI to help refactor. For example, commit `449bc23` scaled changes I'd already proven by hand across the rest of the backend.

A few things to check out: the AI Chatbox on the `/reports` page, the reusable dynamic form component, and runtime request validation in Nest.

Things still missing: authentication and permissions, pagination, full browser e2e tests, and custom application logging. Test coverage is limited, though there are HTTP tests for request validation.
