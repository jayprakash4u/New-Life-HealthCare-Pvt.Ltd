# Website admin

Run `npm run admin:setup` from the project directory to generate the first login. To choose a username, run `npm run admin:setup -- clinic-editor`. Save the password printed in the terminal, then restart the website and open `/admin`. The setup command creates an ignored `.env.local` file and refuses to overwrite an existing file.

The dashboard groups the public pages, services, treatments and existing articles. Editors can publish headings and introductory copy, service and treatment overviews, and existing article text. Published article titles also update the homepage and Blogs listings.

Published content is stored in `.admin-data` by default. A deployed instance needs a private writable persistent directory, which can be set with `ADMIN_DATA_DIR`. Back up that directory alongside your deployment configuration. Configure `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, and `ADMIN_SESSION_SECRET` in the hosting environment and serve the admin over HTTPS.

This workspace supports one configured editor account and one persistent server instance. Doctor records, media uploads, new article creation, and multi-editor roles require separate editors and storage.
