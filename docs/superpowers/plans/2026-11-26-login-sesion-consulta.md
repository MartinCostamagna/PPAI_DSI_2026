# Login + Sesión + Seed + Consulta de estados — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Que el login valide usuario/contraseña y cree la sesión del empleado real, ampliar el seed y agregar una consulta de estados separada del CU.

**Architecture:** Backend NestJS + TypeORM (Postgres en docker, `ppai_back_end/compose.yaml`, puerto 5433). Nuevo módulo `login/` (controller `auth`) que crea `Sesion` en BD; el `GestorRecepcionBolsin` no se modifica. Nuevo módulo `consulta/` de solo lectura que consulta `BolsinOrm` directo y devuelve DTOs. Front Angular (standalone, signals) con `AuthService`, guard y página `consulta-estados`.

**Tech Stack:** NestJS 11, TypeORM, jest (ts-jest, `rootDir: src`, `*.spec.ts`), Angular.

**Spec:** `docs/superpowers/specs/2026-11-26-login-sesion-consulta-design.md`

## Global Constraints
- Sin JWT/cookies/tokens. La contraseña **se guarda hasheada** en `hash_contrasenia` con `crypto.scryptSync` de Node (sin dependencias nuevas), formato `salt:hash` en hex (salt de 16 bytes aleatorios, keylen 64), verificación con `crypto.timingSafeEqual`.
- No modificar `src/service/gestor-recepcion-bolsin.service.ts` ni `src/controller/pantalla-recepcion-bolsin.controller.ts`.
- No tocar `ppai_back_end/src/types/estado.type.ts` (borrado sin commitear por el usuario; no incluirlo en commits: usar `git add <paths>` explícitos, nunca `git add -A`).
- **No hacer commits ni push.** Todo queda sin commitear para que el usuario lo revise. Ignorar los pasos de commit.
- Comentarios y nombres en español, siguiendo el estilo del repo.
- Backend en `http://localhost:3000`; el front ya usa esa URL.

## Review Focus
- Contraseña correcta con usuario inexistente / usuario correcto con contraseña incorrecta → 401 en ambos, mismo mensaje (test en Task 2).
- Login de un segundo usuario mientras hay otra sesión abierta → la anterior queda con `fechaYHoraFin` y el CU usa al nuevo (verificación en Task 7).
- Consulta de un precinto que existe pero no es de la CM del logueado → 404 (test en Task 3).
- Consulta sin sesión activa → 401 (test en Task 3).
- Recargar el navegador en `/inicio` → el guard consulta `GET /auth/sesion` y no echa al usuario si hay sesión (verificación en Task 5).

---

### Task 1: Modelo — Empleado→CM ManyToOne y validación de contraseña

**Files:**
- Modify: `ppai_back_end/src/persistence/orm-entities/empleado.orm-entity.ts` (OneToOne → `@ManyToOne(() => ComisionMedicaOrm, cm => cm.empleados)`)
- Modify: `ppai_back_end/src/persistence/orm-entities/comision-medica.orm-entity.ts` (`empleado` → `@OneToMany(() => EmpleadoOrm, e => e.comisionMedica) empleados!: EmpleadoOrm[]`)
- Create: `ppai_back_end/src/util/contrasenia.util.ts`
- Modify: `ppai_back_end/src/entities/usuario.entity.ts`
- Test: `ppai_back_end/src/entities/usuario.entity.spec.ts`, `ppai_back_end/src/util/contrasenia.util.spec.ts`

**Interfaces:**
- Produces: `hashearContrasenia(contrasenia: string): string` y `verificarContrasenia(contrasenia: string, hashAlmacenado: string): boolean` (exportadas de `src/util/contrasenia.util.ts`; `verificar` devuelve false si el formato es inválido, nunca lanza); `Usuario.validarContrasenia(contrasenia: string): boolean` (delegando en `verificarContrasenia` con `hashContrasenia`).

- [ ] **Step 1: Tests** `contrasenia.util.spec.ts`: `hashearContrasenia('1234')` no contiene `'1234'` en claro y tiene forma `/^[0-9a-f]{32}:[0-9a-f]{128}$/`; dos hashes de `'1234'` son distintos (salt); `verificarContrasenia('1234', h)` → true, `'12345'` → false, hash malformado `'abc'` → false. `usuario.entity.spec.ts`: `new Usuario('jperez', hashearContrasenia('1234'), empleado).validarContrasenia('1234')` → `true`; `'12345'` → `false`; `''` → `false`.
- [ ] **Step 2:** `cd ppai_back_end && npx jest src/entities src/util` → FAIL.
- [ ] **Step 3:** Implementar el util y `validarContrasenia` y el cambio de relación ORM. Grep otras referencias a `comisionMedica.empleado` / `cm.empleado` y adaptarlas.
- [ ] **Step 4:** Test PASS; `npm run build` sin errores.

### Task 2: Login backend (repositorios + servicio + controller)

**Files:**
- Create: `ppai_back_end/src/persistence/repository/usuario.repository.ts` (`USUARIO_REPOSITORY`, `interface UsuarioRepository { buscarPorNombre(nombre: string): Promise<Usuario | null> }`)
- Create: `ppai_back_end/src/persistence/repository/typeorm/usuario.typeorm.repository.ts` (relaciones `empleado.comisionMedica`, mapea con `UsuarioMapper.toDomain`)
- Modify: `ppai_back_end/src/persistence/repository/sesion.repository.ts` + `typeorm/sesion.typeorm.repository.ts`: agregar `iniciarSesion(nombreUsuario: string, fechaYHoraInicio: Date): Promise<void>` (cierra todas las sesiones con `fechaYHoraFin IS NULL` poniendo `fechaYHoraInicio` como fin, e inserta una nueva para el usuario con ese nombre) y `cerrarSesionActiva(fechaYHoraFin: Date): Promise<void>`.
- Modify: `ppai_back_end/src/persistence/persistence.module.ts` (registrar `UsuarioOrm` en forFeature, proveer y exportar `USUARIO_REPOSITORY`)
- Create: `ppai_back_end/src/login/login.service.ts`, `ppai_back_end/src/login/login.controller.ts`
- Modify: `ppai_back_end/src/app.module.ts` (registrar controller/servicio)
- Test: `ppai_back_end/src/login/login.service.spec.ts`

**Interfaces:**
- Consumes: `Usuario.validarContrasenia` (Task 1), `SesionRepository.buscarSesionActiva()` existente.
- Produces:
  - `type DatosSesion = { nombreUsuario: string; nombreEmpleado: string; nombreCM: string }` (exportado de `login.service.ts`)
  - `LoginService.iniciarSesion(usuario: string, contrasena: string): Promise<DatosSesion>` — lanza `UnauthorizedException('Usuario o contraseña incorrectos')`.
  - `LoginService.cerrarSesion(): Promise<void>`
  - `LoginService.obtenerSesionActual(): Promise<DatosSesion>` — lanza `UnauthorizedException('No hay una sesión activa')`.
  - HTTP: `POST /auth/login` body `{ usuario, contrasena }` → `DatosSesion`; `POST /auth/logout` → 201 vacío; `GET /auth/sesion` → `DatosSesion` o 401.

- [ ] **Step 1: Tests** `login.service.spec.ts` con repos mockeados (objetos con `jest.fn()`):
  - credenciales válidas → devuelve `{ nombreUsuario:'jperez', nombreEmpleado:'Juan Pérez', nombreCM:'CM Córdoba' }` y llama `iniciarSesion('jperez', expect.any(Date))`.
  - usuario inexistente → rejects `UnauthorizedException`, `iniciarSesion` no llamado.
  - contraseña incorrecta → rejects `UnauthorizedException`, `iniciarSesion` no llamado.
  - `obtenerSesionActual` sin sesión → rejects `UnauthorizedException`.
- [ ] **Step 2:** `npx jest src/login` → FAIL.
- [ ] **Step 3:** Implementar repos, servicio y controller.
- [ ] **Step 4:** `npx jest` PASS y `npm run build` OK.

### Task 3: Consulta de estados backend (módulo separado, solo lectura)

**Files:**
- Create: `ppai_back_end/src/consulta/consulta-estados.types.ts`
- Create: `ppai_back_end/src/consulta/consulta-estados.service.ts`
- Create: `ppai_back_end/src/consulta/consulta-estados.controller.ts` (`@Controller('consulta')`)
- Create: `ppai_back_end/src/consulta/consulta.module.ts` (imports `TypeOrmModule.forFeature([BolsinOrm])`, `PersistenceModule`)
- Modify: `ppai_back_end/src/app.module.ts` (importar `ConsultaModule`)
- Test: `ppai_back_end/src/consulta/consulta-estados.service.spec.ts`

**Interfaces:**
- Consumes: `SesionRepository.buscarSesionActiva()` → `sesion.obtenerEmpleadoLog().mostrarCM()` para la CM del logueado.
- Produces (tipos exportados):
  ```ts
  type CambioEstadoDto = { estado: string; fechaYHoraInicio: Date; fechaYHoraFin: Date | null; empleado: string };
  type BolsinResumenDto = { numeroPrecinto: number; cmOrigen: string; cmDestino: string; estadoActual: string; cantidadRemitos: number };
  type DocumentacionDetalleDto = { tipoDocumento: string; asunto: string; estadoActual: string; historial: CambioEstadoDto[] };
  type RemitoDetalleDto = { numero: number; estadoActual: string; documentaciones: DocumentacionDetalleDto[] };
  type BolsinDetalleDto = BolsinResumenDto & { historial: CambioEstadoDto[]; remitos: RemitoDetalleDto[] };
  ```
  - `ConsultaEstadosService.listarBolsines(): Promise<BolsinResumenDto[]>` — bolsines con CM origen **o** destino igual a la del logueado, ordenados por `numeroPrecinto`.
  - `ConsultaEstadosService.obtenerDetalle(numeroPrecinto: number): Promise<BolsinDetalleDto>` — `NotFoundException` si no existe o no es de su CM. Historiales ordenados por `fechaYHoraInicio` ascendente; `empleado` = nombre del empleado.
  - Ambos: `UnauthorizedException` sin sesión activa.
  - HTTP: `GET /consulta/bolsines`, `GET /consulta/bolsines/:numeroPrecinto`.

- [ ] **Step 1: Tests** con `Repository<BolsinOrm>` y `SesionRepository` mockeados (fixtures ORM armados a mano: un bolsín Rosario→Córdoba, uno Rosario→Mendoza):
  - logueado de Córdoba → `listarBolsines` devuelve solo el primero, con `cantidadRemitos` correcto.
  - `obtenerDetalle` del bolsín de Córdoba → historial de documentación ordenado ascendente aunque el fixture venga desordenado.
  - `obtenerDetalle` del bolsín Rosario→Mendoza → `NotFoundException`.
  - sin sesión → `UnauthorizedException`.
- [ ] **Step 2:** `npx jest src/consulta` → FAIL.
- [ ] **Step 3:** Implementar (usar relaciones como `BolsinTypeOrmRepository.relaciones`).
- [ ] **Step 4:** `npx jest` PASS, `npm run build` OK.

### Task 4: Seed ampliado (en el `seed.ts` existente)

**Files:**
- Modify: `ppai_back_end/src/seed/seed.ts`

**Interfaces:**
- Consumes: `hashearContrasenia` (Task 1).

Requisitos de datos:
- CMs: `CM Córdoba`, `CM Rosario`, `CM Mendoza`.
- Empleados/usuarios (contraseña `1234`, guardada como `hashearContrasenia('1234')` del util de Task 1, sin sesión precreada — borrar el `SesionOrm.save` actual):
  - Córdoba: Juan Pérez / `jperez`, Laura Díaz / `ldiaz`
  - Rosario: Ana Gómez / `agomez`, Carlos Ruiz / `cruiz`
  - Mendoza: Marta Silva / `msilva`, Pedro Luna / `pluna`
- Generalizar el helper `detalle(...)` para recibir el estado final de la documentación y armar el historial coherente (Registrada → EnRemito → EnBolsinSaliente → EnBolsinEnviado → [RecibidaYAceptada | RecibidaYRechazada | ParaRedirigir]), con `fechaYHoraFin: null` solo en el último. Ídem `bolsin(...)` para estados Creado / Cerrado / Enviado / RecibidoEnCMDestino.
- Mantener 1001–1004 como están (1001, 1002 Enviado→Córdoba; 1003 Cerrado; 1004 Córdoba→Rosario Enviado).
- Agregar:
  - **1005** Mendoza→Córdoba, Enviado, 2 remitos (1 doc y 2 docs) — Córdoba queda con **4 enviados** (1001, 1002, 1005, 1006).
  - **1006** Rosario→Córdoba, Enviado, 1 remito con 2 docs.
  - **1007** Mendoza→Rosario, Enviado, 1 remito con 1 doc.
  - **1008** Córdoba→Mendoza, Enviado, 1 remito con 2 docs.
  - **1009** Córdoba→Mendoza, Creado, remito `Creado`, docs `EnRemito`.
  - **1010** Rosario→Córdoba, RecibidoEnCMDestino, remito `RecibidoYAceptado`, docs `RecibidaYAceptada` (recibido por `ldiaz`).
  - **1011** Mendoza→Córdoba, RecibidoEnCMDestino, remito `RecibidoYAceptado`, docs `RecibidaYRechazada`.
  - **1012** Córdoba→Rosario, RecibidoEnCMDestino, remito `RecibidoYAceptado`, docs `ParaRedirigir`.
- Números de remito únicos y correlativos desde 506.

- [ ] **Step 1:** Implementar.
- [ ] **Step 2:** `cd ppai_back_end && docker compose up -d && npm run seed` → imprime `Seed completado.`
- [ ] **Step 3:** Verificar con `docker exec ppai_db psql -U ppai -c "select numero_precinto, estado_actual from bolsin order by 1"` → 12 filas con los estados de arriba; `select count(*) from sesion` → 0.

### Task 5: Front — login real, guard y logout

**Files:**
- Create: `PPAI_Front_End/src/app/services/auth.service.ts`
- Create: `PPAI_Front_End/src/app/guards/sesion.guard.ts`
- Modify: `PPAI_Front_End/src/app/pages/login/login.ts`, `login.html` (mensaje de error bajo el formulario; placeholder `Ej. jperez`)
- Modify: `PPAI_Front_End/src/app/app.routes.ts` (`canActivate: [sesionGuard]` en todas las rutas salvo `login`)
- Modify: `PPAI_Front_End/src/app/components/app-shell/app-shell.ts/.html` y `pages/inicio/inicio.ts` (usar `AuthService` en vez de `getUsuarioFicticio`; botón "Cerrar sesión" en el shell)
- Modify: `PPAI_Front_End/src/app/services/pantalla-recepcion-bolsin.service.ts` (eliminar `usuarioFicticio`, `setUsuarioFicticio`, `getUsuarioFicticio`)

**Interfaces:**
- Consumes: `POST /auth/login`, `POST /auth/logout`, `GET /auth/sesion` (Task 2), forma `DatosSesion`.
- Produces: `AuthService` (`providedIn: 'root'`) con `login(usuario: string, contrasena: string): Observable<DatosSesion>`, `logout(): Observable<void>`, `cargarSesion(): Observable<boolean>` (true si hay sesión, false ante 401), signal `sesion(): DatosSesion | null`. `sesionGuard: CanActivateFn` usa `cargarSesion()` y redirige a `/login`.

- [ ] **Step 1:** Implementar. Login: 401 → mostrar "Usuario o contraseña incorrectos" y no navegar; éxito → `/inicio`. Logout → `/login`.
- [ ] **Step 2:** `cd PPAI_Front_End && npx ng build` → sin errores.

### Task 6: Front — página Consulta de estados

**Files:**
- Create: `PPAI_Front_End/src/app/interfaces/consulta-estados.interface.ts` (espejo de los DTOs de Task 3)
- Create: `PPAI_Front_End/src/app/services/consulta-estados.service.ts` (`listarBolsines()`, `obtenerDetalle(numeroPrecinto: number)` → `http://localhost:3000/consulta/...`)
- Create: `PPAI_Front_End/src/app/pages/consulta-estados/consulta-estados.{ts,html,css}`
- Modify: `app.routes.ts` (ruta `consulta-estados` con guard), `app-shell.html/.ts` (el ítem "Consultar bolsines" navega a la página; `seccionActiva` admite `'consulta'`), `inicio.html` (botón "Consultar estados" en el banner)

Comportamiento: tabla de bolsines (precinto, origen, destino, estado con badge); al hacer click en uno se expande/muestra el detalle: historial del bolsín, y por cada remito su estado y sus documentaciones con estado actual e historial (estado, desde, hasta o "actual", empleado). Botón "Actualizar" que recarga. Estilos reutilizando `panel`, `badge`, `btn` de las páginas existentes. Etiqueta visible: "Funcionalidad de apoyo — fuera del CU 28".

- [ ] **Step 1:** Implementar.
- [ ] **Step 2:** `npx ng build` → sin errores.

### Task 7: Verificación end-to-end

- [ ] **Step 1:** `docker compose up -d && npm run seed && npm run start` (background) en `ppai_back_end`.
- [ ] **Step 2:** `curl -X POST localhost:3000/auth/login -H 'content-type: application/json' -d '{"usuario":"jperez","contrasena":"mal"}'` → 401. Con `1234` → `{nombreEmpleado:"Juan Pérez", nombreCM:"CM Córdoba"}`.
- [ ] **Step 3:** `GET /bolsines/recepcion` → `nombreCMEmpleado: "CM Córdoba"` y precintos 1001, 1002, 1005, 1006.
- [ ] **Step 4:** Para 1001 opción 1, 1002 opción 3, 1005 opción 4: `GET /bolsines/recepcion/<p>`, `POST /bolsines/recepcion {opcion}`, `POST /bolsines/recepcion/confirmar`. Luego `GET /consulta/bolsines/<p>` → bolsín `RecibidoEnCMDestino`, docs `RecibidaYAceptada` / `RecibidaYRechazada` / `ParaRedirigir`, último cambio del historial con empleado `Juan Pérez`.
- [ ] **Step 5:** Login como `agomez` → `GET /bolsines/recepcion` devuelve `CM Rosario` con 1004; `select count(*) from sesion where fecha_y_hora_fin is null` → 1.
- [ ] **Step 6:** `GET /consulta/bolsines/1007` como `agomez` → 200 (destino Rosario); `GET /consulta/bolsines/1008` → 404.
- [ ] **Step 7:** `docker exec ppai_db psql -U ppai -c "select nombre, hash_contrasenia from usuario"` → ningún hash es `1234`.
- [ ] **Step 8:** Re-seed para dejar los datos limpios para la demo. Sin commits ni push.
