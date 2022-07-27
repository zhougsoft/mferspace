# mferspace

**pre-prod TODO**:

- get rid of supabase client entirely
- stick with good old fashioned postgres driver
- connect via conventional env vars
- use db plumbing config from the mfer reddit repo example
- should be universal and connect to any PGSQL DB

### setup .env

1. make a copy of `.env.local.example` named `.env.local`
1. add values to `.env.local`

### run on local:

1. `npm install`
1. `npm run build`
1. `npm run dev`
1. go to `http://localhost:3000`
