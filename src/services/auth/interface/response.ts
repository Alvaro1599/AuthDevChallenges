import { Profile as profileGoogle } from 'passport-google-oauth20';
import { Profile as profileFacebook } from 'passport-facebook';
import { Profile as profileGithub } from 'passport-github2';

export type ResponseSocial = profileGoogle | profileFacebook | profileGithub;
