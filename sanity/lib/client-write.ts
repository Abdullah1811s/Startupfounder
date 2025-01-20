
import "server-only"

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId , token } from '../env'

export const write_client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  
})
if(!write_client.config().token)
  throw new Error("no write token")
