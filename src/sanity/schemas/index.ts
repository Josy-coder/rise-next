import {type SchemaTypeDefinition} from 'sanity'

// Import all schemas
import siteSettings from './documents/siteSettings'
import navigation from './documents/navigation'
import footer from './documents/footer'
import homePage from './documents/homePage'
import aboutPage from './documents/aboutPage'
import opportunity from './documents/opportunity'
import news from './documents/news'
import teamMember from './documents/teamMember'
import committee from './documents/committee'
import cohort from './documents/cohort'
import testimony from './documents/testimony'
import activity from './documents/activity'
import newsletter from './documents/newsletter'
import legalPage from './documents/legalPage'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    // Singletons
    siteSettings,
    navigation,
    footer,
    homePage,
    aboutPage,

    // Documents
    opportunity,
    news,
    teamMember,
    committee,
    cohort,
    testimony,
    activity,
    newsletter,
    legalPage,
  ],
}
