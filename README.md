# Mapeo del Diagrama de Secuencia

## PantallaRecepcionBolsin [Boundary]

| Métodos | Archivos |
| :--- | :--- |
| 1. seleccionOpcRegistRecepBolsin() | Front/ <br> - pages/inicio/inicio.ts
| 2. habilitarVentana() | Back/ <br> - src/controller/pantalla-recepcion-bolsin.controller.ts |
| 10. mostrarCMUsuarioLog() | Front/ <br> - pages/bolsines-enviados-a-esta-comision-medica/bolsines-enviados-a-esta-comision-medica.ts <br> - services/recepcion-bolsin.service.ts |
| 21. mostrarBolsinesPSeleccion() | Front/ <br> - pages/bolsines-enviados-a-esta-comision-medica/bolsines-enviados-a-esta-comision-medica.ts <br> - services/recepcion-bolsin.service.ts |
| 23. tomarSeleccionBolsin() | Front/ <br> - pages/bolsines-enviados-a-esta-comision-medica/bolsines-enviados-a-esta-comision-medica.ts <br> - services/recepcion-bolsin.service.ts |
| 34. mostrarDatosRemitos() | Back/ <br> - src/controller/pantalla-recepcion-bolsin.controller.ts <br> Front/ <br> - pages/bolsin-seleccionado.html <br> - pages/bolsin-seleccionado.ts |
| 35. mostrarOpcionesRecBolsinPSelec() | Front/ <br> - pages/bolsin-seleccionado.html |
| 36. tomarSeleccionOpcRecBolsin() | Back/ <br> - src/controller/pantalla-recepcion-bolsin.controller.ts <br> Front/ <br> - pages/bolsin-seleccionado.ts <br> - services/recepcion-bolsin.service.ts |
| 38. solicitarConfirmacionSelec() | Front/ <br> - pages/bolsin-seleccionado.html <br> - pages/bolsin-seleccionado.ts |
| 39. tomarConfirmacion() | Back/ <br> - src/controller/pantalla-recepcion-bolsin.controller.ts <br> Front/ <br> - pages/bolsin-seleccionado.html <br> - pages/bolsin-seleccionado.ts <br> - pages/informar-cu-exitoso/informar-cu-exitoso.ts <br> - services/recepcion-bolsin.service.ts |
| 64. informarEjecucionExitosaCU() | Back/ <br> - src/controller/pantalla-recepcion-bolsin.controller.ts <br> Front/ <br> - pages/informar-cu-exitoso/informar-cu-exitoso.ts <br> - services/recepcion-bolsin.service.ts |

## GestorRecepcionBolsin [Control]

> Únicamente en el archivo `src/service/gestor-recepcion-bolsin.service.ts`
```ts
3. nuevaRecepcionBolsin()
4. obtenerEmpleadoLog()
7. obtenerNombreCMEmpleado()
11. buscarBolsinesEnviadosParaCM()
23. tomarSeleccionBolsin()
24. buscarNroRemitosYDocumentacion()
37. tomarSeleccionOpcRecBolsin()
40. tomarConfirmacion()
41. registrarRecepcionBolsin()
42. tomarFechaYHoraActual()
43. buscarEstadoRecibidoEnCMDestino()
46. buscarEstadoRecibidoYAceptado()
49. buscarEstadoRecibidaYAceptada()
63. llamarCUNotificarRecepcionBolsin()
65. finCU()
```