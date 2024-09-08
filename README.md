# The Nature of Code

Some of exercises from the book The Nature of Code by Daniel Shiffman
implemented in plain old HTML, CSS, and Javascript. Part of the motivation
was dipping back into a bit of computational visualization, a long running
interest of mine. Another part of the motivation was recapturing the
absolute joy of building a web site in the old fashioned way. The whole
site is hand-rolled, including the CSS. Sometimes it's good to go back
to basics.

## Deploy

Code is deployed to https://www.blurbpress.com/.

- `aws s3 cp ./p5 "s3://blurbpress.com/p5" --recursive --cache-control no-store --profile blurbpress_deploy`
- `aws s3 cp index.html "s3://blurbpress.com" --cache-control no-store --profile blurbpress_deploy`

## Other Projects leveraging P5.js

There are both nascent, Life(tm) has other plans for me
right now. However, both provide a basis to continue.

- cloud chamber
- hydrogen energy states
