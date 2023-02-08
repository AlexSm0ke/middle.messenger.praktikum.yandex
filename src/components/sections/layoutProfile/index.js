import Handlebars from 'handlebars/dist/handlebars.runtime';
import Layouts from 'handlebars-layouts';
import layoutProfile from './layoutProfile.hbs';


Handlebars.registerPartial('layoutProfile', layoutProfile);
Handlebars.registerHelper(Layouts(Handlebars));
