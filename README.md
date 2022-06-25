# mferspace

CONTEXT: edit auth/token flow

in or around `EditProfilePortal.tsx`

1. edit & save profile w/ no auth token
1. on 403, re-sign & re-fetch auth token
1. automatically attempt re-sending previous form data

_also_, a **big pre-prod security TODO**:
- get rid of supabase client entirely
- stick with good old fashioned postgres driver
- connect via conventional env vars
- use db plumbing config from reddit clone example


### setup .env

1. make a copy of `.env.local.example` named `.env.local`
1. add values to `.env.local` 

### run on local:

1. `npm install`
1. `npm run build`
1. `npm run dev`
1. go to `http://localhost:3000`
