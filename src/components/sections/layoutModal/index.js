import Handlebars from 'handlebars/dist/handlebars.runtime';
import Layouts from 'handlebars-layouts';
import layoutModal from './layoutModal.hbs';


Handlebars.registerPartial('layoutModal', layoutModal);
Handlebars.registerHelper(Layouts(Handlebars));
