This is [Scissor](https://nextjs.org/). This service will provode shor aliases redirexcting to long URLs

## Fumctional Requirements
- Generate unique code which would be used for the short link
- Generate shorter links for long links that eventually redirect to the the long links
- Users would optionally be able to pick a custom shortcode for their URL
- Users should be able to optionally specify the expiration time for a link
First, run the development server:

## Non-functional Requirements
- System should be highly available
- URL redirection should happen in real-time with minimal latency. 
- Shortened links should not be guessable (not predictable). 
- Clean up database if user specifies expiration period
