const Menu =  [
  { header: 'Core Cms' },
  {
    title: 'Dashboard',
    group: 'apps',
    icon: 'dashboard',
    name: 'Dashboard',
  },
  { header: 'Main Menu' },
  {
    title: 'Pages',
    group: 'components',
    component: 'components',
    icon: 'tune',
    items: [
      { name: 'createPage', title: 'Create page', component: 'pages/create' },
      { name: 'allPages', title: 'All pages', component: 'pages/all' },
    ]
  },
  {
    title: 'Menus',
    group: 'pickers',
    component: 'picker',
    icon: 'filter_vintage',
    items: [
      { name: 'timepicker', title: 'Timepicker', component: 'pickers/timepicker' },     
      { name: 'datepicker', title: 'Datepicker', component: 'pickers/datepicker' },      

    ]
  },
  {
    title: 'Media',
    group: 'layout',
    component: 'layout',
    icon: 'view_compact',
    items: [
      { name: 'bottom-sheets', title: 'Bottom panels', component: 'components/bottom-sheets' },
      { name: 'expansion-panels', title: 'Expansion panels', component: 'components/expansion-panels' },
      { name: 'footer', title: 'Footer', component: 'components/footer' },
      { name: 'lists', title: 'Lists', component: 'components/lists' },
      { name: 'jumbotrons', title: 'Jumbotrons', badge: 'new', component: 'components/jumbotrons' },
      { name: 'menus', title: 'Menus', component: 'components/menus' },
      { name: 'tabs', title: 'Tabs', component: 'components/tabs' },
      { name: 'toolbar', title: 'Toolbars', component: 'components/toolbar' },
      { name: 'timeline', title: 'Timeline', component: 'components/timeline' },
    ]
  },  
  {
    title: 'Plugins',
    group: 'forms',
    component: 'forms',
    icon: 'edit',
    items: [
      { name: 'basic', title: 'General', component: 'components/basic-forms' },
      { name: 'selects', title: 'Selects', badge: 'new', component: 'components/selects' },
      { name: 'selection-controls', title: 'Selection Controls', component: 'components/selection-controls' },
      { name: 'text-fields', title: 'Text Fields', component: 'components/text-fields' },
      { name: 'steppers', title: 'Steppers', component: 'components/steppers' },
      { name: 'editors', title: 'Editors', component: 'components/editors' },
    ]
  },
  { divider: true },
  { header: 'Extras' },
  {
    title: 'Users',
    group: 'extra',
    icon: 'list',
    items: [
      { name: 'Login', title: 'Login', component: 'Login' },
      { name: '404', title: '404', component: 'NotFound' },
      { name: '403', title: '403', component: 'AccessDenied' },
      { name: '500', title: '500', component: 'ServerError' },
    ]
  },
];
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

export default Menu;
