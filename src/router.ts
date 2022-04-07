import Vue from "vue";
import Router from "vue-router";
import DashboardLayout from "@/layout/DashboardLayout.vue";
import AuthLayout from "@/layout/AuthLayout.vue";
import Home from "@/layout/Home.vue";
import Swal from "sweetalert2";
Vue.use(Router);

const router = new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      redirect: "home",
      component: Home,
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("./views/Home.vue"),
        },
        {
          path: "/bienestar-aprendiz",
          name: "BienestarAprendiz",
          component: () => import("@/views/BienestarAprendiz.vue"),
        },
        {
          path: "/gestion-curricular",
          name: "GestionCurricular",
          component: () => import("@/views/GestionCurricular.vue"),
        },
        {
          path: "/servicios-egresados",
          name: "ServiciosEgresados",
          component: () => import("@/views/ServiciosEgresados.vue"),
        },
        {
          path: "/servicios-ENI",
          name: "ServiciosENI",
          component: () => import("@/views/ENI.vue"),
        },
        {
          path: "/AdministracionEducativa",
          name: "AdministracionEducativa",
          component: () => import("@/views/AdministracionEducativa.vue"),
        },
        {
          path: "/ejecucion-formacion",
          name: "Ejecucion-Formacion",
          component: () => import("@/views/EjecucionFormacion.vue"),
        },
        {
          path: "/sennova",
          name: "Sennova",
          component: () => import("@/views/Sennova.vue"),
        },
        {
          path: "/gestion-estrategica-formacion",
          name: "Gestion-Estrategica-Formacion",
          component: () => import("@/views/GestionEstrategicaFormacion.vue"),
        },
      ],
    },
    {
      path: "/",
      redirect: "dashboard",
      component: DashboardLayout,
      props: true,
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("./views/Dashboard.vue"),
          meta: { requiresAuth: true },
        },

        // inicio rutas modulo usuario
        {
          path: "/GestionarUsuario",
          name: "GestionarUsuario",
          component: () => import("./layout/Usuario/Index.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/RegistrarUsuario",
          name: "RegistrarUsuario",
          component: () => import("./layout/Usuario/RegistrarUsuario.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/VerDetalle-:id",
          name: "VerDetalle",
          props: true,
          component: () => import("./layout/Usuario/VerDetalle.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/ModificarUsuario-:id",
          name: "ModificarUsuario",
          component: () => import("./layout/Usuario/Modificar.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/CrearFormacion-:id",
          name: "CrearFormacion",
          component: () => import("./layout/Usuario/CrearFormacion.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/VerDetalleFormacion-:id",
          name: "VerDetalleFormacion",
          component: () => import("./layout/Usuario/VerDetalleFormacion.vue"),
          meta: { requiresAuth: true },
        },
        // fin rutas modulo Usuario

        // Inicio rutas Perfil y permisos de Perfil
        {
          path: "/GestionarPerfil",
          name: "GestionarPerfil",
          component: () => import("./layout/Perfil/Index.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/RegistrarPerfil",
          name: "RegistrarPerfil",
          component: () => import("./layout/Perfil/Registrar.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/ModificarPerfil-:id",
          name: "ModificarPerfil",
          props: true,
          component: () => import("./layout/Perfil/Modificar.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/GestionarPermiso",
          name: "GestionarPermiso",
          component: () => import("./layout/Perfil/PermisosXModulo.vue"),
          meta: { requiresAuth: true },
        },

        // Fin rutas Perfil y permisos de Perfil
        // Inicio rutas convocatoria
        {
          path: "/GestionarConvocatoria",
          name: "GestionarConvocatoria",
          component: () =>
            import("./layout/BienestarAprendiz/Convocatoria/Index.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/RegistrarConvocatoria",
          name: "RegistrarConvocatoria",
          component: () =>
            import("./layout/BienestarAprendiz/Convocatoria/Registrar.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/ModificarConvocatoria-:id",
          name: "ModificarConvocatoria",
          component: () =>
            import("./layout/BienestarAprendiz/Convocatoria/Modificar.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/AdjuntarResolucion-:id",
          name: "AdjuntarResolucion",
          component: () =>
            import(
              "./layout/BienestarAprendiz/Convocatoria/AdjuntarConvocatoria.vue"
            ),
          meta: { requiresAuth: true },
        },
        {
          path: "/VerDetalleConvocatoria-:id",
          name: "VerDetalleConvocatoria",
          props: true,
          component: () =>
            import("./layout/BienestarAprendiz/Convocatoria/VerDetalle.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/AdjudicarApredizConvocatoria-:id",
          name: "AdjudicarApredizConvocatoria",
          component: () =>
            import("./layout/BienestarAprendiz/Adjudicaciones/Adjudicar.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "Index_Finalizado-:id",
          name: "Index_Finalizado",
          component: () =>
            import("./layout/BienestarAprendiz/Finalizada/finalizada.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/Inscribir-:id",
          name: "Inscribir",
          component: () =>
            import("./layout/BienestarAprendiz/Adjudicaciones/Inscribir.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/GestionarAdjudicados-:id",
          name: "GestionarAdjudicados",
          component: () =>
            import("./layout/BienestarAprendiz/Adjudicaciones/Index.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/VerDetalleAprendiz",
          name: "VerDetalleAprendiz",
          component: () =>
            import(
              "./layout/BienestarAprendiz/Adjudicaciones/VerDetalleAprendiz.vue"
            ),
          meta: { requiresAuth: true },
        },
        {
          path: "/ReportesNacionalBienestar",
          name: "ReportesNacionalBienestar",
          props: true,
          component: () =>
            import("./layout/BienestarAprendiz/Reportes/IndexNacional.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/ReportesRegionalBienestar",
          name: "ReportesRegionalBienestar",
          props: true,
          component: () =>
          import("./layout/BienestarAprendiz/Reportes/IndexRegional.vue"),

          meta: { requiresAuth: true },
        },
        {
          path: "/ReportesRepresentantesNacional",
          name: "ReportesRepresentantesNacional",
          props: true,
          component: () =>
          import("./layout/BienestarAprendiz/Reportes/IndexRepresentantes.vue"),

          meta: { requiresAuth: true },
        },
        {
          path: "/ReportePresupuestoNacional",
          name: "ReportePresupuestoNacional",
          props: true,
          component: () =>
            import("./components/ReportesBienestar/Regional/ReportePresupuestoRegional.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/GestionarRepresentantesBienestar",
          name: "Representantes",
          props: true,
          component: () =>
            import("./layout/BienestarAprendiz/Repersentante/Index.vue"),
          meta: { requiresAuth: true },
        },
        //Inicio rutas criterios de priorizacion
        {
          path: "/GestionarCriteriosBienestar",
          name: "GestionarCriteriosBienestar",
          props: true,
          component: () =>
            import(
              "./layout/BienestarAprendiz/CriteriosPriorizacion/Index.vue"
            ),
          meta: { requiresAuth: true },
        },
        //Fin rutas criterios de priorizacion

        //Inicio rutas de Novedades
        {
          path: "/GestionarNovedadesBienestar",
          name: "GestionarNovedadesBienestar",
          props: true,
          component: () =>
            import("./layout/BienestarAprendiz/Novedades/Index.vue"),
          meta: { requiresAuth: true },
        },
        //Fin de la ruta de novedades

        // ruta crear representante
        {
          path: "/RegistrarRepresentanteBienestar",
          name: "CrearRepresentante",
          props: true,
          component: () =>
            import(
              "./layout/BienestarAprendiz/Repersentante/CrearRepresentante.vue"
            ),
          meta: { requiresAuth: true },
        },
        //fin ruta crear representante

        //ver detalle de un representante
        {
          path: "/VerRepresentanteBienestar-:id",
          name: "VerRepresentanteBienestar",
          props: true,
          component: () =>
            import("./layout/BienestarAprendiz/Repersentante/VerDetalle.vue"),
          meta: { requiresAuth: true },
        },
        //fin ver detalle de  un representante

        {
          path: "/GestionarGraficasNacionales",
          name: "GestionarGraficasNacionales",
          props: true,
          component: () =>
            import(
              "./layout/BienestarAprendiz/GestionNacional/graficasNacionales.vue"
            ),
          meta: { requiresAuth: true },
        },

        {
          path: "/PlanecionAccion",
          name: "PlanecionAccion",
          props: true,
          component: () => import("./layout/PlaneacionAccion/Index.vue"),
          meta: { requiresAuth: true },
        },
        // ENI
        {
          path: "/GestionarPICENI",
          name: "GestionarPICENI",
          props: true,
          component: () => import("./layout/ModuloENI/PIC/Index.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/VerDetalleCapacitacionENI-:id",
          name: "VerDetalleCapacitacionENI",
          props: true,
          component: () => import("./layout/ModuloENI/PIC/VerDetallePIC.vue"),
          meta: { requiresAuth: true },
        },

        //provicional modificar pic eni inicio
        {
          path: "/ModificarCapacitacionENI-:id",
          name: "ModificarCapacitacionENI",
          props: true,
          component: () => import("./layout/ModuloENI/PIC/ModificarPIC.vue"),
          meta: { requiresAuth: true },
        },
        //provicional modificar pic eni fin
        // Inicio Entidad Capacitadora
        {
          path: "/GestionarEntidadCapacitadora",
          name: "GestionarEntidadCapacitadora",
          props: true,
          component: () =>
            import(
              "./layout/ModuloENI/Convocatoria/EntidadCapacitadora/Index.vue"
            ),
          meta: { requiresAuth: true },
        },
        {
          path: "/VerDetalleEntidadCapacitadora-:id",
          name: "VerDetalleEntidadCapacitadora",
          props: true,
          component: () =>
            import(
              "./layout/ModuloENI/Convocatoria/EntidadCapacitadora/VerDetalleEntidadCapacitadora.vue"
            ),
          meta: { requiresAuth: true },
        },

        {
          path: "/RegistrarEntidadCapacitadora",
          name: "RegistrarEntidadCapacitadora",
          props: true,
          component: () =>
            import(
              "./layout/ModuloENI/Convocatoria/EntidadCapacitadora/RegistrarEntidadCapacitadora.vue"
            ),
          meta: { requiresAuth: true },
        },
        {
          path: "/ModificarEntidadCapacitadora-:id",
          name: "ModificarEntidadCapacitadora",
          props: true,
          component: () =>
            import(
              "./layout/ModuloENI/Convocatoria/EntidadCapacitadora/ModificarEntidadCapacitadora.vue"
            ),
          meta: { requiresAuth: true },
        },
        // Fin Entidad Capacitadora

        //Inicio lineas tecnologicas

        {
          path: "/GestionarLineasTecnologicas",
          name: "GestionarLineasTecnologicas",
          props: true,
          component: () =>
            import(
              "./layout/ModuloENI/Convocatoria/Linea_Tecnologica/index.vue"
            ),
          meta: { requiresAuth: true },
        },
        {
          path: "/VerDetalleLineasTecnologicas-:id",
          name: "VerDetalleLineasTecnologicas",
          props: true,
          component: () =>
            import(
              "./layout/ModuloENI/Convocatoria/Linea_Tecnologica/VerDetalleLineasTecnologica.vue"
            ),
          meta: { requiresAuth: true },
        },
        {
          path: "/RegistrarLineasTecnologica",
          name: "RegistrarLineasTecnologica",
          props: true,
          component: () =>
            import(
              "./layout/ModuloENI/Convocatoria/Linea_Tecnologica/RegistrarLineasTecnologica.vue"
            ),
          meta: { requiresAuth: true },
        },
        {
          path: "/ModificarLineaTecnologica-:id",
          name: "ModificarLineaTecnologica",
          props: true,
          component: () =>
            import(
              "./layout/ModuloENI/Convocatoria/Linea_Tecnologica/ModificarLineaTecnologica.vue"
            ),
          meta: { requiresAuth: true },
        },

        //Fin lineas tecnologicas

        //provicional registrar pic eni inicio
        {
          path: "/RegistrarCapacitacionENI",
          name: "RegistrarCapacitacionENI",
          props: true,
          component: () => import("./layout/ModuloENI/PIC/RegistrarPIC.vue"),
          meta: { requiresAuth: true },
        },
        //provicional registrar pic eni fin
        {
          path: "/GestionarConvocatoriaENI",
          name: "GestionarConvocatoriaENI",
          props: true,
          component: () => import("./layout/ModuloENI/Convocatoria/Index.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/VerDetalleConvocatoriaENI-:id",
          name: "VerDetalleConvocatoriaENI",
          props: true,
          component: () =>
            import(
              "./layout/ModuloENI/Convocatoria/VerDetalleConvocatoriaENI.vue"
            ),
          meta: { requiresAuth: true },
        },
        //rutas provicionales eni inicio
        {
          path: "/ModificarConvocatoriaENI-:id",
          name: "ModificarConvocatoriaENI",
          props: true,
          component: () =>
            import(
              "./layout/ModuloENI/Convocatoria/ModificarConvocatoriaENI.vue"
            ),
          meta: { requiresAuth: true },
        },
        //rutas provicionales eni fin

        // rutas eni pic eje
        {
          path: "/GestionarPICEje",
          name: "GestionarPICEje",
          props: true,
          component: () => import("./layout/ModuloENI/PIC/PICEje/Index.vue"),
          meta: { requiresAuth: true },
        },

        {
          path: "/VerDetallePICEje-:id",
          name: "VerDetallePICEje",
          props: true,
          component: () =>
            import("./layout/ModuloENI/PIC/PICEje/VerDetallePICEje.vue"),
          meta: { requiresAuth: true },
        },

        {
          path: "/ModificarPICEje-:id",
          name: "ModificarPICEje",
          props: true,
          component: () =>
            import("./layout/ModuloENI/PIC/PICEje/ModificarPICEje.vue"),
          meta: { requiresAuth: true },
        },

        {
          path: "/RegistrarPICEje",
          name: "RegistrarPICEje",
          props: true,
          component: () =>
            import("./layout/ModuloENI/PIC/PICEje/RegistrarPICEje.vue"),
          meta: { requiresAuth: true },
        },

        // fin rutas pic eje

        {
          path: "/PostulacionesConvocatoriaENI-:id",
          name: "PostulacionesConvocatoriaENI",
          props: true,
          component: () =>
            import("./layout/ModuloENI/Convocatoria/Postulacion.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/AprobarCertificarInstructor-:id",
          name: "AprobarCertificarInstructor",
          props: true,
          component: () =>
            import(
              "./layout/ModuloENI/Convocatoria/AprobarCertificarInstructor.vue"
            ),
          meta: { requiresAuth: true },
        },
        {
          path: "/InscritosConvocatoriaENI-:id",
          name: "InscritosConvocatoriaENI",
          props: true,
          component: () =>
            import("./layout/ModuloENI/Convocatoria/Inscritos.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/GestionarCapacitacionENI",
          name: "GestionarCapacitacionENI",
          props: true,
          component: () =>
            import("./layout/ModuloENI/EvaluacionCapacitacion/Index.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/EvaluarCapacitacion-:id_pic_inscripcion",
          name: "EvaluarCapacitacion",
          props: true,
          component: () =>
            import(
              "./layout/ModuloENI/EvaluacionCapacitacion/VerDetalleEvaluacionCapacitacion.vue"
            ),
          meta: { requiresAuth: true },
        },
        {
          path: "/GestionarConvocatoriaActivasENI",
          name: "GestionarConvocatoriaActivasENI",
          props: true,
          component: () =>
            import("./layout/ModuloENI/CapacitacionesActivas/Index.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/VerDetalleCapacitacion-:id",
          name: "VerDetalleCapacitacion",
          props: true,
          component: () =>
            import(
              "./layout/ModuloENI/EvaluacionCapacitacion/VerDetalleCapacitacion.vue"
            ),
          meta: { requiresAuth: true },
        },
        {
          path: "/VerDetalleConvocatoriasActivasENI-:id",
          name: "VerDetalleConvocatoriasActivasENI",
          props: true,
          component: () =>
            import(
              "./layout/ModuloENI/CapacitacionesActivas/VerDetalleConvocatoriaENI.vue"
            ),
          meta: { requiresAuth: true },
        },
        {
          path: "/ValidarInscritosCapacitacionENI",
          name: "ValidarInscritosCapacitacionENI",
          props: true,
          component: () =>
            import("./layout/ModuloENI/Convocatoria/ValidacionInscritos.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/VerDetallePostulado-:id",
          name: "VerDetallePostulado",
          props: true,
          component: () =>
            import("./layout/ModuloENI/Convocatoria/VerDetallePostulado.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/CrearFormulario",
          name: "CrearFormulario",
          props: true,
          component: () => import("./layout/CrearFormulario.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/CrearActaCompromiso",
          name: "CrearActaCompromiso",
          props: true,
          component: () =>
            import("./layout/ModuloENI/ActaCompromiso/CrearActaCompromiso.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/RegistrarConvocatoriaENI",
          name: "RegistrarConvocatoriaENI",
          props: true,
          component: () =>
            import(
              "./layout/ModuloENI/Convocatoria/RegistrarConvocatoriaENI.vue"
            ),
          meta: { requiresAuth: true },
        },
        {
          path: "/reg",
          name: "reg",
          props: true,
          component: () => import("./layout/ModuloENI/Convocatoria/reg.vue"),
        },
        //rutas modulo Egresados inicio

        //ruta Actividad
        {
          path: "/RegistrarActividadesPANE",
          name: "RegistrarActividadesPANE",
          props: true,
          component: () =>
            import("./layout/ModuloEgresados/Actividad/Index.vue"),
          meta: { requiresAuth: true },
        },
        //ruta ActividadTrazabilidad

        // {
        //   path: "/GestionarActividadTrazabilidad",
        //   name: "GestionarActividadTrazabilidad",
        //   component: () =>
        //     import("./layout/ModuloEgresados/ActividadTrazabilidad/Index.vue"),
        // },
        {
          path: "/RegistrarActividadTrazabilidad-:id_actividad-:id_eje",
          name: "RegistrarActividadTrazabilidad",
          component: () =>
            import(
              "./layout/ModuloEgresados/ActividadTrazabilidad/RegistrarActividadTrazabilidad.vue"
            ),
        },
        {
          path: "/VerDetalleActividadTrazabilidad-:id_actividad-:id_eje",
          name: "VerDetalleActividadTrazabilidad",
          component: () =>
            import(
              "./layout/ModuloEgresados/ActividadTrazabilidad/VerDetalleActividadTrazabilidad.vue"
            ),
        },
        {
          path: "/ModificarActividadTrazabilidad-:id_actividad-:id_eje",
          name: "ModificarActividadTrazabilidad",
          component: () =>
            import(
              "./layout/ModuloEgresados/ActividadTrazabilidad/ModificarActividadTrazabilidad.vue"
            ),
        },

        //ruta Grupo
        {
          path: "/RegistrarGrupoPANE-:actividad_id",
          name: "RegistrarGrupoPANE",
          props: true,
          component: () => import("./layout/ModuloEgresados/Grupo/Index.vue"),
          meta: { requiresAuth: true },
        },

        //ruta Indicador
        {
          path: "/RegistrarIndicadorPANE-:actividad_id",
          name: "RegistrarIndicadorPANE",
          props: true,
          component: () =>
            import("./layout/ModuloEgresados/Indicador/Index.vue"),
          meta: { requiresAuth: true },
        },

        //ruta para ver el listado de linamiento PANE
        //ruta Indicador
        {
          path: "/GestionarPANE",
          name: "GestionarPANE",
          props: true,
          component: () => import("./layout/ModuloEgresados/home/Index.vue"),
          meta: { requiresAuth: true },
        },

        {
          path: "/RegistrarActividadRegional",
          name: "RegistrarActividadRegional",
          props: true,
          component: () =>
            import("./layout/ModuloEgresados/ActividadRegional/Registrar.vue"),
          meta: { requiresAuth: true },
        },

        {
          path: "/GestionarActividadRegional",
          name: "GestionarActividadRegional",
          props: true,
          component: () =>
            import("./layout/ModuloEgresados/ActividadRegional/Index.vue"),
          meta: { requiresAuth: true },
        },
        //ruta registrar centro de formacion
        {
          path: "/RegistrarActividadCentro",
          name: "RegistrarActividadCentro",
          props: true,
          component: () =>
            import("./layout/ModuloEgresados/ActividadCentro/Registrar.vue"),
          meta: { requiresAuth: true },
        },

        {
          path: "/GestionarActividadCentro",
          name: "GestionarActividadCentro",
          props: true,
          component: () =>
            import("./layout/ModuloEgresados/ActividadCentro/Index.vue"),
          meta: { requiresAuth: true },
        },
        //ruta seguimiento de actividad
        {
          path: "/RegistrarSeguimientoActividad",
          name: "RegistrarSeguimientoActividad",
          props: true,
          component: () =>
            import(
              "./layout/ModuloEgresados/SeguimientoActividad/Registrar.vue"
            ),
          meta: { requiresAuth: true },
        },

        {
          path: "/GestionarSeguimientoActividad",
          name: "GestionarSeguimientoActividad",
          props: true,
          component: () =>
            import("./layout/ModuloEgresados/SeguimientoActividad/Index.vue"),
          meta: { requiresAuth: true },
        },

        {
          path: "/VerDetalleSeguimientoActividad-:id",
          name: "VerDetalleSeguimientoActividad",
          props: true,
          component: () =>
            import(
              "./layout/ModuloEgresados/SeguimientoActividad/VerDetalle.vue"
            ),
          meta: { requiresAuth: true },
        },

        {
          path: "/ModificarSeguimientoActividad",
          name: "ModificarSeguimientoActividad",
          props: true,
          component: () =>
            import(
              "./layout/ModuloEgresados/SeguimientoActividad/Modificar.vue"
            ),
          meta: { requiresAuth: true },
        },

        //fin ruta de seguimiento actividad

        //inicio rutas de seguimiento centros
        {
          path: "/GestionarSeguimientoCentros",
          name: "GestionarSeguimientoCentros",
          props: true,
          component: () =>
            import("./layout/ModuloEgresados/SeguimientoCentros/Index.vue"),
          meta: { requiresAuth: true },
        },

        {
          path: "/SeguimientoActividades",
          name: "SeguimientoActividades",
          props: true,
          component: () =>
            import(
              "./layout/ModuloEgresados/SeguimientoCentros/SeguimientoActividades.vue"
            ),
          meta: { requiresAuth: true },
        },

        {
          path: "/VerDetalleActividad",
          name: "VerDetalleActividad",
          props: true,
          component: () =>
            import(
              "./layout/ModuloEgresados/SeguimientoCentros/VerDetalleActividad.vue"
            ),
          meta: { requiresAuth: true },
        },

        //fin rutas seguimiento centros

        //ruta para crear un lineamiento Pane
        // {
        //   path: '/RegistrarPANEEgresados', 
        //   name: 'CrearPane',
        //   props: true,
        //   component: () => import( './layout/ModuloEgresados/Pane/Crear.vue')
        // },

        //rutas para acceder a Gestion Nacional

        {
          path: "/GestionarGraficasEgresados",
          name: "GestionarGraficasEgresados",
          props: true,
          component: () =>
            import(
              "./layout/ModuloEgresados/GestionNacional/graficasNacionales.vue"
            ),
          meta: { requiresAuth: true },
        },

        //rutas modulo Egresador Fin

        //INicio rutas Hoja de vida ENI
        // rutas hija de vida index
        {
          path: "/GestionarHojaDeVidaENI",
          name: "GestionarHojaDeVidaENI",
          component: () => import("./layout/ModuloENI/HojaDeVida/Index.vue"),
          meta: { requiresAuth: true },
        },

        // rutas hija de vida forms
        {
          path: "/ModificarDatosPersonalesENI",
          name: "ModificarDatosPersonalesENI",
          component: () =>
            import(
              "./layout/ModuloENI/HojaDeVida/ModificarDatosPersonales.vue"
            ),
          meta: { requiresAuth: true },
        },
        //registrar educacion persona
        {
          path: "/RegistrarEducacionPersona",
          name: "RegistrarEducacionPersona",
          component: () =>
            import(
              "./layout/ModuloENI/HojaDeVida/Educacion/RegistrarEducacionPersona.vue"
            ),
          meta: { requiresAuth: true },
        },
        //--------------------------------------------------------------------------------
        // registrar idioma
        {
          path: "/RegistrarIdiomaPersona",
          name: "RegistrarIdiomaPersona",
          component: () =>
            import(
              "./layout/ModuloENI/HojaDeVida/Idiomas/RegistrarIdiomaPersona.vue"
            ),
          meta: { requiresAuth: true },
        },
        //--------------------------------------------------------------------------------
        //--------------------------------------------------------------------------------
        // Modificar idioma
        {
          path: "/ModificarIdiomaPersona-:id",
          name: "ModificarIdiomaPersona",
          component: () =>
            import(
              "./layout/ModuloENI/HojaDeVida/Idiomas/ModificarIdiomaPersona.vue"
            ),
          meta: { requiresAuth: true },
        },
        //--------------------------------------------------------------------------------
        // Ver idioma
        {
          path: "/VerDetalleIdiomaPersona",
          name: "VerDetalleIdiomaPersona",
          component: () =>
            import(
              "./layout/ModuloENI/HojaDeVida/Idiomas/VerDetalleIdiomaPersona.vue"
            ),
          meta: { requiresAuth: true },
        },
        //--------------------------------------------------------------------------------

        //Ver Edu//--------------------------------------------------------------------------------
        {
          path: '/ReportesNacionalENI',
          name: 'ReportesNacionalENI',
          component: () => import('./layout/ModuloENI/Reportes/Index.vue')
        },

        {
          path: "/VerDetalleEducacionPersona",
          name: "VerDetalleEducacionPersona",
          component: () =>
            import(
              "./layout/ModuloENI/HojaDeVida/Educacion/VerDetalleEducacionPersona.vue"
            ),
          meta: { requiresAuth: true },
        },
        {
          path: "/ModificarEducacionPersona-:id ",
          name: "ModificarEducacionPersona",
          component: () =>
            import(
              "./layout/ModuloENI/HojaDeVida/Educacion/ModificarEducacionPersona.vue"
            ),
          meta: { requiresAuth: true },
        },
        // funcionarios
        //Inicio funcionarios

        {
          path: "/GestionarFuncionarios",
          name: "GestionarFuncionarios",
          props: true,
          component: () =>
            import("./layout/ModuloENI/Convocatoria/Funcionarios/index.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/VerDetalleFuncionarios-:id",
          name: "VerDetalleFuncionarios",
          props: true,
          component: () =>
            import(
              "./layout/ModuloENI/Convocatoria/Funcionarios/VerDetalleFuncionarios.vue"
            ),
          meta: { requiresAuth: true },
        },
        {
          path: "/RegistrarFuncionarios",
          name: "RegistrarFuncionarios",
          props: true,
          component: () =>
            import(
              "./layout/ModuloENI/Convocatoria/Funcionarios/RegistrarFuncionarios.vue"
            ),
          meta: { requiresAuth: true },
        },
        {
          path: "/ModificarFuncionarios-:id",
          name: "ModificarFuncionarios",
          props: true,
          component: () =>
            import(
              "./layout/ModuloENI/Convocatoria/Funcionarios/ModificarFuncionarios.vue"
            ),
          meta: { requiresAuth: true },
        },

        //Fin funcionarios
        {
          path: "/ModificarExperienciaPersona-:id",
          name: "ModificarExperienciaPersona",
          component: () =>
            import(
              "./layout/ModuloENI/HojaDeVida/Experiencia/ModificarExperienciaPersona.vue"
            ),
          meta: { requiresAuth: true },
        },

        //-----------------------------------------------------------------------------------
        //rutas Experiencia
        //rutas hojas de vida // Sub ruta modifiar Experiencia
        {
          path: "/ModificarExperienciaPersona-:id",
          name: "ModificarExperienciaPersona",
          component: () =>
            import(
              "./layout/ModuloENI/HojaDeVida/Experiencia/ModificarExperienciaPersona.vue"
            ),
          meta: { requiresAuth: true },
        },
        //rutas hojas de vida // Sub rutas registrar Experiencia
        {
          path: "/RegistrarExperienciaPersona",
          name: "RegistrarExperienciaPersona",
          component: () =>
            import(
              "./layout/ModuloENI/HojaDeVida/Experiencia/RegistrarExperienciaPersona.vue"
            ),
          meta: { requiresAuth: true },
        },
        //rutas hojas de vida // Sub rutas ver Experiencia
        {
          path: "/VerDetalleExperienciaPersona",
          name: "VerDetalleExperienciaPersona",
          component: () =>
            import(
              "./layout/ModuloENI/HojaDeVida/Experiencia/VerDetalleExperienciaPersona.vue"
            ),
          meta: { requiresAuth: true },
        },
        {
          path: '/Prueba',
          name: 'Prueba',
          component: () => import('./layout/Prueba/Pruebas.vue')
        },
        //-----------------------------------------------------------------------------------
        // rutas formacion
        //rutas hojas de vida // Sub rutas registrar Formacion
        /*{
          path: '/RegistrarFormacionPersona',
          name: 'RegistrarFormacionPersona',
          component: () => import('./layout/ModuloENI/HojaDeVida/Formacion/RegistrarFormacionPersona.vue'),
          meta: { requiresAuth: true }
        }, */
        //-----------------------------------------------------------------------------------
        //Fin rutas Hoja de vida ENI
        // Rutas Articulacion Media Rutas Convenio
        {
          path: "/GestionarConvenio",
          name: "GestionarConvenio",
          component: () =>
            import("./layout/ArticulacionMedia/Convenio/index.vue"),
        },
        {
          path: "/VerDetalleConvenio-:id",
          name: "VerDetalleConvenio",
          component: () =>
            import(
              "./layout/ArticulacionMedia/Convenio/VerDetalleConvenio.vue"
            ),
        },
        {
          path: "/RegistrarConvenio",
          name: "RegistrarConvenio",
          component: () =>
            import("./layout/ArticulacionMedia/Convenio/RegistrarConvenio.vue"),
        },
        {
          path: "/ModificarConvenio-:id",
          name: "ModificarConvenio",
          component: () =>
            import("./layout/ArticulacionMedia/Convenio/ModificarConvenio.vue"),
        },

        //Rutas Articulacion Media Rutas de viabilidad
        {
          path: "/GestionarViabilidad-:id_convenio",
          name: "GestionarViabilidad",
          component: () =>
            import(
              "./layout/ArticulacionMedia/ViabilidadConvenio/Viabilidad/index.vue"
            ),
        },
        {
          path: "/VerDetalleViabilidad-:id",
          name: "VerDetalleViabilidad",
          component: () =>
            import(
              "./layout/ArticulacionMedia/ViabilidadConvenio/Viabilidad/VerDetalleViabilidad.vue"
            ),
        },
        {
          path: "/ModificarViabilidad-:id",
          name: "ModificarViabilidad",
          component: () =>
            import(
              "./layout/ArticulacionMedia/ViabilidadConvenio/Viabilidad/ModificarViabilidad.vue"
            ),
        },
        // Viabilidad Documento
        {
          path: "/RegistrarViabilidadDocumento-:id_convenio",
          name: "RegistrarViabilidadDocumento",
          component: () =>
            import(
              "./layout/ArticulacionMedia/ViabilidadConvenio/ViabilidadDocumento/RegistrarViabilidadDocumento.vue"
            ),
        },
        {
          path: "/GestionarEjecucionConvenioColegios-:id_convenio",
          name: "GestionarEjecucionConvenioColegios",
          component: () =>
            import(
              "./layout/ArticulacionMedia/EjecucionConvenio/GestionarEjecucionConvenioColegios.vue"
            ),
        },
        // Ejecucion docs Alistamiento
        {
          path: "/RegistrarAlistamiento-:id_convenio-:id_colegio",
          name: "RegistrarAlistamiento",
          component: () =>
            import(
              "./layout/ArticulacionMedia/EjecucionConvenio/Alistamiento/RegistrarAlistamiento.vue"
            ),
        },
        // Ejecucion docs Ejecucion
        {
          path: "/RegistrarEjecucion-:id_convenio-:id_colegio",
          name: "RegistrarEjecucion",
          component: () =>
            import(
              "./layout/ArticulacionMedia/EjecucionConvenio/Ejecucion/RegistrarEjecucion.vue"
            ),
        },

        // Ejecucion docs Certificacion
        {
          path: "/RegistrarCertificacion-:id_convenio-:id_colegio",
          name: "RegistrarCertificacion",
          component: () =>
            import(
              "./layout/ArticulacionMedia/EjecucionConvenio/Certificacion/RegistrarCertificacion.vue"
            ),
        },
        {
          path: "/GestionarCertificacion-:id_convenio-:id_colegio",
          name: "GestionarCertificacion",
          component: () =>
            import(
              "./layout/ArticulacionMedia/EjecucionConvenio/Certificacion/Index.vue"
            ),
        },
        // Ejecucion docs Certificacion documentos
        {
          path: "/RegistrarCertificacionDocumento-:id_convenio-:id_colegio",
          name: "RegistrarCertificacionDocumento",
          component: () =>
            import(
              "./layout/ArticulacionMedia/EjecucionConvenio/CertificacionDocumento/RegistrarCertificacionDocumento.vue"
            ),
        },
        {
          path: "/GestionarCertificacionDocumento-:id_convenio-:id_colegio",
          name: "GestionarCertificacionDocumento",
          component: () =>
            import(
              "./layout/ArticulacionMedia/EjecucionConvenio/CertificacionDocumento/index.vue"
            ),
        },

        //Fin Rutas Articulacion Media Rutas de viabilidad
        // Rutas Articulacion Media Rutas Programas Proyectados

        {
          path: "/GestionarProgramasProyectados-:id_convenio",
          name: "GestionarProgramasProyectados",
          component: () =>
            import("./layout/ArticulacionMedia/ProgramaProyectado/Index.vue"),
        },
        {
          path: "/VerDetalleProgramasProyectados-:id_convenio",
          name: "VerDetalleProgramasProyectados",
          component: () =>
            import(
              "./layout/ArticulacionMedia/ProgramaProyectado/VerDetalleProgramaProyectados.vue"
            ),
        },
        {
          path: "/RegistrarProgramasProyectados-:id_convenio",
          name: "RegistrarProgramasProyectados",
          component: () =>
            import(
              "./layout/ArticulacionMedia/ProgramaProyectado/RegistrarProgramaProyectado.vue"
            ),
        },
        // Rutas Articulacion Media Rutas Programas Aprobados
        {
          path: "/GestionarProgramasAprobados-:id_convenio-:id_colegio",
          name: "GestionarProgramasAprobados",
          component: () =>
            import("./layout/ArticulacionMedia/ProgramasAprobados/Index.vue"),
        },
        {
          path: "/VerDetalleProgramasAprobados-:id_convenio",
          name: "VerDetalleProgramasAprobados",
          component: () =>
            import(
              "./layout/ArticulacionMedia/ProgramasAprobados/VerDetalleProgramaAprobado.vue"
            ),
        },
        // Rutas Articulacion Media Rutas Programas Colegios
        {
          path: "/GestionarProgramaColegio",
          name: "GestionarProgramaColegio",
          component: () =>
            import("./layout/ArticulacionMedia/ColegioPrograma/Index.vue"),
        },
        {
          path: "/RegistrarProgramaColegio-:id",
          name: "RegistrarProgramaColegio",
          component: () =>
            import(
              "./layout/ArticulacionMedia/ColegioPrograma/RegistrarColegioPrograma.vue"
            ),
        },
        {
          path: "/GestionarProgramasColegios-:id_convenio",
          name: "GestionarProgramasColegios",
          component: () =>
            import(
              "./layout/ArticulacionMedia/ColegioPrograma/GestionarProgramasColegios.vue"
            ),
        },

        // Rutas Articulacion Media Rutas Colegio
        {
          path: "/GestionarColegio",
          name: "GestionarColegio",
          component: () =>
            import("./layout/ArticulacionMedia/Colegio/index.vue"),
        },
        {
          path: "/RegistrarColegio",
          name: "RegistrarColegio",
          component: () =>
            import("./layout/ArticulacionMedia/Colegio/RegistrarColegio.vue"),
        },
        {
          path: "/ModificarColegio-:id",
          name: "ModificarColegio",
          component: () =>
            import("./layout/ArticulacionMedia/Colegio/ModificarColegio.vue"),
        },
        {
          path: "/VerDetalleColegio-:id",
          name: "VerDetalleColegio",
          component: () =>
            import("./layout/ArticulacionMedia/Colegio/VerDetalleColegio.vue"),
        },

        // rutas Articulacion Media Rutas sensibilizacion

        {
          path: "/GestionarSensibilizacion-:id_convenio",
          name: "GestionarSensibilizacion",
          component: () =>
            import(
              "./layout/ArticulacionMedia/SensibilizacionConvenio/Sensibilizacion/index.vue"
            ),
        },
        {
          path: "/VerDetalleSensibilizacion-:id_convenio",
          name: "VerDetalleSensibilizacion",
          component: () =>
            import(
              "./layout/ArticulacionMedia/SensibilizacionConvenio/Sensibilizacion/VerDetalleSensibilizacion.vue"
            ),
        },
        {
          path: "/ModificarSensibilizacion-:id_convenio",
          name: "ModificarSensibilizacion",
          component: () =>
            import(
              "./layout/ArticulacionMedia/SensibilizacionConvenio/Sensibilizacion/ModificarSensibilizacion.vue"
            ),
        },
        {
          path: "/RegistrarSensibilizacion-:id_convenio",
          name: "RegistrarSensibilizacion",
          component: () =>
            import(
              "./layout/ArticulacionMedia/SensibilizacionConvenio/Sensibilizacion/RegistrarSensibilizacion.vue"
            ),
        },

        //ruta ArticulacionMedia Reportes

        {
          path: '/ReportesArticulacionConLaMedia',
          name: "ReportesArticulacionConLaMedia",
          component: () => import('./layout/ArticulacionMedia/Reportes/index.vue')
        },

        //ruta documento sensibilizacion
        {
          path: "/RegistrarSensibilizacionDocumento-:id_convenio",
          name: "RegistrarSensibilizacionDocumento",
          component: () =>
            import(
              "./layout/ArticulacionMedia/SensibilizacionConvenio/SensibilizacionDocumento/RegistrarSensibilizacionDocumento.vue"
            ),
        },

        // Rutas documentos
        {
          path: "/GestionarDocumento",
          name: "GestionarDocumento",
          component: () => import("./layout/Documento/Index.vue"),
        },
        {
          path: "/VerDetalleDocumento",
          name: "VerDetalleDocumento",
          component: () => import("./layout/Documento/VerDetalleDocumento.vue"),
        },
        {
          path: "/ModificarDocumento",
          name: "ModificarDocumento",
          component: () => import("./layout/Documento/ModificarDocumento.vue"),
        },

        //RUTAS TRAZABILIDAD EGRESADOS SENA
        {
          path: "/GestionarTrazabilidades",
          name: "GestionarTrazabilidades",
          component: () =>
            import("./layout/ModuloEgresados/Trazabilidad/Index.vue"),
        },
        {
          path: "/VerDetalleTrazabilidades-:id",
          name: "VerDetalleTrazabilidades",
          component: () =>
            import(
              "./layout/ModuloEgresados/Trazabilidad/VerDetalleTrazabilidades.vue"
            ),
        },
        {
          path: "/RegistrarTrazabilidades",
          name: "RegistrarTrazabilidades",
          component: () =>
            import(
              "./layout/ModuloEgresados/Trazabilidad/RegistrarTrazabilidad.vue"
            ),
        },
        {
          path: "/ModificarTrazabilidad-:id",
          name: "ModificarTrazabilidad",
          props: true,
          component: () =>
            import(
              "./layout/ModuloEgresados/Trazabilidad/ModificarTrazabilidad.vue"
            ),
          meta: { requiresAuth: true },
        },
        //FIN RUTAS TRAZABILIDAD EGRESADOS SENA

        // ruta reporte egresados 
        {
          path: "/ReportesNacionalPane",
          name: "ReportesNacionalPane",
          props: true,
          component: () =>
            import("./layout/ModuloEgresados/Reportes/IndexNacional.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/ReportesRegionalPane",
          name: "ReportesRegionalPane",
          props: true,
          component: () =>
            import("./layout/ModuloEgresados/Reportes/IndexRegional.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "/ReportesCentroPane",
          name: "ReportesCentroPane",
          props: true,
          component: () =>
            import("./layout/ModuloEgresados/Reportes/IndexCentro.vue"),
          meta: { requiresAuth: true },
        },
      // ruta reporte trazabilidad
      {
        path: "/ReportesTrazabilidad",
        name: "ReportesTrazabilidad",
        props: true,
        component: () =>
          import("./components/ReportesEgresados/ReporteTrazabilidad.vue"),
        meta: { requiresAuth: true },
      },
      ],
    },
    {
      path: "/",
      redirect: "login",
      component: AuthLayout,
      children: [
        {
          path: "/login",
          name: "login",
          component: () => import("./views/Login.vue"),
        },
        {
          path: "/olvidasteContrasena",
          name: "olvidasteContrasena",
          component: () =>
            import(
              "./layout/Usuario/RecuperarContrasena/Olvidastecontrasena.vue"
            ),
        },
        {
          path: "/validacionRecuperarContrasena",
          name: "validacionRecuperarContrasena",
          component: () =>
            import(
              "./layout/Usuario/RecuperarContrasena/ValidarRecuperacionContrasena.vue"
            ),
        },
        {
          path: "/register",
          name: "register",
          component: () => import("./views/Register.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  let usuario = JSON.parse(sessionStorage.getItem("usuario"));

  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (usuario) {
      next();
    } else {
      Swal.fire({
        position: "top",
        icon: "info",
        title: "Ups! primero debes iniciar sesión",
        text: "Para acceder a esta sección de la pagina debes iniciar sesión",
        showConfirmButton: false,
        timer: 1500,
      });
      next({
        name: "login",
        // query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});

export default router;
