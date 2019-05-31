
# CoreCMS SPA application



## Project setup
```
vagrant up
```

### Compiles and hot-reloads for development
```
vagrant ssh
cd /vagrant
sudo npm run serve //sudo here, because its need privilegies for serving on port 80
Local url: spa.corecms.test
```

### Compiles and minifies for production
```
npm run build
```
### Compiles and minifies for staging
```
 npm run build -- --mode staging
```
### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Reference

* [Vuetifyjs](https://vuetifyjs.com/)
* [Vue](https://vuejs.org/index.html/)
* [ECharts](http://echarts.baidu.com/option.html)
* [Stylus](http://stylus-lang.com/)
