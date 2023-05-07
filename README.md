Estas líneas de código configuran Handlebars como el motor de vistas para tu aplicación Express:

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

La primera línea, app.engine('handlebars', engine());, registra el motor de Handlebars con Express. Esto le dice a Express que use Handlebars para renderizar las vistas.

La segunda línea, app.set('view engine', 'handlebars');, establece Handlebars como el motor de vistas predeterminado para tu aplicación Express. Esto significa que cuando llamas al método res.render para renderizar una vista, Express usará Handlebars para hacerlo.

La tercera línea, app.set('views', './views');, establece la ubicación del directorio de vistas para tu aplicación Express. Esto le dice a Express dónde buscar los archivos de vista cuando intenta renderizar una vista. En este caso, estás diciendo a Express que busque los archivos de vista en el directorio ./views.
