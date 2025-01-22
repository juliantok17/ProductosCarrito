/* 
/////////////////////////////////  NOTAS:  /////////////////////777 
PRE ENTREGA BACKEND II - video clase 4 3:20:00 integradora

1- Encryptar la contraseña del usuario mediante el paquete bcrypt
(utilizar el método "hashSync"). ☑

2- Desarrollar las estrategias de Passport para que funcionen con el modelo de usuarios ☑

3- Implementar un sistema de login del usuario que trabaje con jwt. ☑

4- Desarrollar una estrategia “current” para extraer la cookie que contiene el token y con dicho 
   token obtener el usuario asociado. En caso de tener el token, devolver al usuario asociado al 
   token, caso contrario devolver un error de passport, utilizar un extractor de cookie. ☑

5- Agregar al router /api/sessions/ la ruta /current, la cual validará al usuario logueado y devolverá
   en una respuesta sus datos (Asociados al JWT). ☑

FORMATO:

Link al repositorio de Github con el proyecto completo, sin la carpeta de Node_modules.
   
77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777

ENTREGA FINAL BACKEND II

Objetivos generales:
- Profesionalizar el servidor desarrollado en la primera preentrega ☑

Objetivos específicos:
- Aplicar una arquitectura profesional para nuestro servidor ☑
- Aplicar prácticas como patrones de diseño, mailing, variables de entorno. etc.

Se debe entregar:
- Modificar nuestra capa de persistencia para aplicar los conceptos de DAO y DTO. ☑
- Implementar el patrón Repository para trabajar con el DAO en la lógica de negocio. ☑
- Modificar la ruta  /current Para evitar enviar información sensible, enviar un DTO del 
  usuario sólo con la información necesaria. ☑
- Realizar un middleware que pueda trabajar en conjunto con la estrategia “current” para hacer
  un sistema de autorización y delimitar el acceso a dichos endpoints: ☑

  º Sólo el administrador puede crear, actualizar y eliminar productos. ☑
  º Sólo el usuario puede agregar productos a su carrito. ☑

- Realizar un sistema de recuperación de contraseña, la cual envíe por medio de un correo un 
  botón que redireccione a una página para restablecer la contraseña (no recuperarla).

  º El link del correo debe expirar después de 1 hora de enviado.
  º Si se trata de restablecer la contraseña con la misma contraseña del usuario, debe impedirlo
    e indicarle que no se puede colocar la misma contraseña.
  º Si el link expiró, debe redirigir a una vista que le permita generar nuevamente el correo de 
    restablecimiento, el cual contará con una nueva duración de 1 hora.



 
77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777

PENDIENTES: 
- VERIFICAR SI HAY EXISTE EL PRODUCTO ANTES DE AGREGARLO AL CARRITO (No hace falta ya que si se 
visualiza es porque existe, de todas maneras se podria validar igual en el caso de que se inyecte codigo)
- Falta agregar filtros (organizar alfabeticamente etc).

 































*/