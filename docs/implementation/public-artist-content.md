# Public artist content, first delivery

The public artist identity is separate from customer profiles, phone numbers, role grants and growth/finance records. Public DTOs contain artistId, displayName, biography, craft and city only. Product cards use the existing public catalog projection and image endpoint.

## Author API

Artist-role sessions can read/update their own `GET/PUT /api/v1/artist/public-profile`, explicitly publish/unpublish it with `POST /public-profile/publication`, list their own `GET /api/v1/artist/stories`, and create/update a UUID story with `PUT /api/v1/artist/stories/:id`. Creation expects revision zero. `POST /api/v1/artist/stories/:id/publication` explicitly changes visibility. Publication commands contain version and a boolean published value. Text commands cannot change owner or publication state. All edits revert visibility to draft and advance the version. Each artist is limited to 100 stories.

## Public API

`GET /api/v1/catalog/artists`, `/artists/:id`, `/artists/:id/products`, `/artists/:id/stories`, `/stories`, `/stories/:id` expose only published content. Lists accept page (1–1000) and pageSize (1–20). An unpublished artist profile hides its store and all stories. Product publication and archival controls remain authoritative. Reads do not forward browser credentials through the BFF.

## Web

Home artist/story discovery, customer artist store, artist story list and story viewer read these APIs. Invalid IDs, hidden resources, empty collections, failures and pagination have explicit states; preview/sample content is never used as API fallback. Text is rendered as React text, preserving paragraphs without executing HTML.

This delivery supports text narratives. Portrait/story media uploads, following, related-product linking and the artist authoring screens remain subsequent work. Public pages therefore do not invent portrait media, verified badges, follower counts or experience claims. Payment remains deferred.
