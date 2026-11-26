# Login conectado a Sesión/Empleado + Seed ampliado + Consulta de estados — Diseño

## Intención
Hoy el login del front es ficticio y el backend siempre toma la misma sesión (`jperez`, CM Córdoba). Queremos que el flujo del CU 28 (Registrar recepción de bolsín) use al empleado que realmente se logueó, tener datos de prueba suficientes para demostrar las tres opciones del CU, y una pantalla aparte para mostrarle a la profesora que los cambios de estado se persisten.

## Objetivos
- Login por **nombre de usuario** (`Usuario.nombre`) + contraseña. La contraseña se guarda **hasheada** (scrypt de Node, `salt:hash`) en `Usuario.hashContrasenia` y se verifica contra ese hash. Credenciales inválidas → no deja pasar.
- Login exitoso: cierra sesiones abiertas y crea una `Sesion` nueva para ese usuario. El gestor del CU sigue igual (`buscarSesionActiva()` → `obtenerEmpleadoLog()`), ahora con el empleado correcto.
- Logout cierra la sesión; guard en el front que manda al login si no hay sesión.
- `Empleado` → `ComisionMedica` pasa de OneToOne a ManyToOne (varios empleados por CM).
- Seed: ampliar el `seed.ts` existente (mantener los bolsines actuales) con más CMs, empleados, usuarios, y bolsines/remitos/documentación en distintos estados. **Mínimo 4 bolsines en estado Enviado hacia CM Córdoba** para demostrar aceptar (RecibidaYAceptada), rechazar (RecibidaYRechazada) y redirigir (ParaRedirigir), más enviados hacia otras CMs.
- Consulta de estados (funcionalidad **separada del CU**, solo lectura): lista los bolsines cuya CM origen o destino es la del empleado logueado, con estado actual; el detalle muestra remitos (estado actual) y documentaciones (estado actual + historial de cambios con fechas y empleado), más el historial del bolsín.

## No-objetivos
- Auth real: sin JWT, cookies ni tokens (sí se hashea la contraseña).
- Cambiar el diagrama de secuencia / gestor del CU.
- Historial de remitos (el modelo no tiene CambioEstadoRemito; se muestra solo estado actual).

## Anti-objetivos
- Que el login rompa el flujo del CU existente.
- Que la consulta modifique datos.

## Approaches
1. **(Elegido)** Login crea la Sesion en BD; el gestor del CU no se toca. Consulta como módulo aparte que lee con TypeORM directo (DTOs), sin pasar por el dominio.
2. Pasar el usuario logueado como parámetro a cada request del CU — descartado: cambia el diagrama de secuencia.
3. Consulta a través de entidades de dominio — descartado: obliga a agregar getters de historial al dominio del CU, que no forma parte del caso de uso.

## Decisiones del usuario
- Login con nombre de usuario (no email).
- Empleado→CM ManyToOne.
- Consulta muestra estado + historial, solo bolsines de la CM del logueado (origen o destino).
- Seed dentro del `seed.ts` existente.
- No hacer commits ni push: todo queda sin commitear para revisión.
- Contraseñas hasheadas (para no guardar texto plano).

## Decisiones dejadas al builder
- Estilos de la página de consulta (seguir los de las páginas existentes).
- Nombres exactos de empleados/asuntos del seed.
