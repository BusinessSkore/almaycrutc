import { createRouter, createWebHistory } from "vue-router";

import store from "../store";

import GuestLayout from "../layouts/GuestLayout.vue";
import LogIn from "../views/LogInView.vue";
import SignUp from "../views/SignUpView.vue";

import DashboardLayout from "../layouts/DashboardLayout.vue";
import Dashboard from "../views/DashboardView.vue";

// Usuario -------------------------------------------------------------------
import UsuarioComponent from "../components/Usuario/PrincipalComponent.vue";
import UsuarioDetailComponent from "../components/Usuario/DetailComponent.vue";
// ----------------------------------------------------------------------------

// Mejora -------------------------------------------------------------------
import MejoraComponent from "../components/Mejora/PrincipalComponent.vue";
import MejoraDetailComponent from "../components/Mejora/DetailComponent.vue";
import MejoraPrintComponent from "../components/Mejora/PrintComponent.vue";
import MejoraFormComp from "../components/Mejora/FormComp.vue";
// ----------------------------------------------------------------------------

// Factura -------------------------------------------------------------------
import FacturaComponent from "../components/Factura/PrincipalComponent.vue";
import FacturaDetailComponent from "../components/Factura/DetailComponent.vue";
import FacturaPrintComponent from "../components/Factura/PrintComponent.vue";
import FacturaFormComp from "../components/Factura/FormComp.vue";
// ----------------------------------------------------------------------------

// Area -------------------------------------------------------------------
import AreaComponent from "../components/Area/PrincipalComponent.vue";
import AreaDetailComponent from "../components/Area/DetailComponent.vue";
import AreaPrintComponent from "../components/Area/PrintComponent.vue";
import AreaFormComp from "../components/Area/FormComp.vue";
// ----------------------------------------------------------------------------

// Reporte -------------------------------------------------------------------
import ReporteComponent from "../components/Reporte/PrincipalComponent.vue";
import ReporteDetailComponent from "../components/Reporte/DetailComponent.vue";
import ReportePrintComponent from "../components/Reporte/PrintComponent.vue";
import ReporteFormComp from "../components/Reporte/FormComp.vue";
// ----------------------------------------------------------------------------

// Reporte2 -------------------------------------------------------------------
import Reporte2Component from "../components/Reporte2/PrincipalComponent.vue";
import Reporte2DetailComponent from "../components/Reporte2/DetailComponent.vue";
import Reporte2PrintComponent from "../components/Reporte2/PrintComponent.vue";
import Reporte2FormComp from "../components/Reporte2/FormComp.vue";
// ----------------------------------------------------------------------------

// Vitola -------------------------------------------------------------------
import VitolaComponent from "../components/Vitola/PrincipalComponent.vue";
import VitolaDetailComponent from "../components/Vitola/DetailComponent.vue";
import VitolaPrintComponent from "../components/Vitola/PrintComponent.vue";
import VitolaFormComp from "../components/Vitola/FormComp.vue";
// ----------------------------------------------------------------------------

// Funcion -------------------------------------------------------------------
import FuncionComponent from "../components/Funcion/PrincipalComponent.vue";
import FuncionDetailComponent from "../components/Funcion/DetailComponent.vue";
import FuncionPrintComponent from "../components/Funcion/PrintComponent.vue";
import FuncionFormComp from "../components/Funcion/FormComp.vue";
// ----------------------------------------------------------------------------

// Empleado -------------------------------------------------------------------
import EmpleadoComponent from "../components/Empleado/PrincipalComponent.vue";
import EmpleadoPrintComponent from "../components/Empleado/PrintComponent.vue";
import EmpleadoFormComp from "../components/Empleado/FormComp.vue";
// ----------------------------------------------------------------------------

// Liga -------------------------------------------------------------------
import LigaComponent from "../components/Liga/PrincipalComponent.vue";
import LigaPrintComponent from "../components/Liga/PrintComponent.vue";
import LigaFormComp from "../components/Liga/FormComp.vue";
// ----------------------------------------------------------------------------

// Cxp -------------------------------------------------------------------
import CxpComponent from "../components/Cxp/PrincipalComponent.vue";
import CxpPrintComponent from "../components/Cxp/PrintComponent.vue";
import CxpFormComp from "../components/Cxp/FormComp.vue";
// ----------------------------------------------------------------------------

// Rueda -------------------------------------------------------------------
import RuedaComponent from "../components/Rueda/PrincipalComponent.vue";
import RuedaPrintComponent from "../components/Rueda/PrintComponent.vue";
import RuedaFormComp from "../components/Rueda/FormComp.vue";
// ----------------------------------------------------------------------------

// Recapada -------------------------------------------------------------------
import RecapadaComponent from "../components/Recapada/PrincipalComponent.vue";
import RecapadaPrintComponent from "../components/Recapada/PrintComponent.vue";
import RecapadaFormComp from "../components/Recapada/FormComp.vue";
// ----------------------------------------------------------------------------

// Mono -------------------------------------------------------------------
import MonoComponent from "../components/Mono/PrincipalComponent.vue";
import MonoPrintComponent from "../components/Mono/PrintComponent.vue";
import MonoFormComp from "../components/Mono/FormComp.vue";
// ----------------------------------------------------------------------------

// Jornada -------------------------------------------------------------------
import JornadaComponent from "../components/Jornada/PrincipalComponent.vue";
import JornadaPrintComponent from "../components/Jornada/PrintComponent.vue";
import JornadaFormComp from "../components/Jornada/FormComp.vue";
// ----------------------------------------------------------------------------

// Prestamo -------------------------------------------------------------------
import PrestamoComponent from "../components/Prestamo/PrincipalComponent.vue";
import PrestamoPrintComponent from "../components/Prestamo/PrintComponent.vue";
import PrestamoFormComp from "../components/Prestamo/FormComp.vue";
// ----------------------------------------------------------------------------

// Pago -------------------------------------------------------------------
import PagoComponent from "../components/Pago/PrincipalComponent.vue";
import PagoPrintComponent from "../components/Pago/PrintComponent.vue";
import PagoPrintSeriesComponent from "../components/Pago/PrintSeriesComponent.vue";
import PagoFormComp from "../components/Pago/FormComp.vue";
// ----------------------------------------------------------------------------

// Nomina -------------------------------------------------------------------
import NominaComponent from "../components/Nomina/PrincipalComponent.vue";
import NominaPrintComponent from "../components/Nomina/PrintComponent.vue";
import NominaFormComp from "../components/Nomina/FormComp.vue";
// ----------------------------------------------------------------------------

// Chat -------------------------------------------------------------------
import ChatComponent from "../components/ChatComponent.vue";
// ----------------------------------------------------------------------------

const routes = [
  {
    path: "/",
    component: GuestLayout,
    children: [
      {
        path: "/",
        name: "LogIn",
        component: LogIn,
      },
      {
        path: "/signup",
        name: "SignUp",
        component: SignUp,
      },
    ],
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          roles: ["Power User", "Administrador", "Encargado", "Agente"],
        },
      },

      // Usuarios --------------------------------------------------------------------
      {
        path: "/usuarios",
        name: "usuarios",
        component: UsuarioComponent,
        meta: {
          roles: ["Power User"],
        },
      },
      {
        path: "/usuarios/:id",
        name: "usuario-details",
        component: UsuarioDetailComponent,
        meta: {
          roles: ["Power User"],
        },
      },
      // ----------------------------------------------------------------------------

      // Mejora --------------------------------------------------------------------
      {
        path: "/mejoras",
        name: "mejoras",
        component: MejoraComponent,
        meta: {
          roles: ["Power User"],
        },
      },
      {
        path: "/mejoras/:id",
        name: "mejora-details",
        component: MejoraDetailComponent,
        meta: {
          roles: ["Power User"],
        },
      },
      {
        path: "/mejoras2/:id",
        name: "mejora-details2",
        component: MejoraPrintComponent,
        meta: {
          roles: ["Power User"],
        },
      },
      {
        path: "/mejoras/new",
        name: "mejoras-form",
        component: MejoraFormComp,
        meta: {
          roles: ["Power User"],
        },
      },

      // ----------------------------------------------------------------------------

      // Factura --------------------------------------------------------------------
      {
        path: "/facturas",
        name: "facturas",
        component: FacturaComponent,
        meta: {
          roles: ["Power User", "Administrador", "Encargado", "Agente"],
        },
      },
      {
        path: "/facturas/:id",
        name: "factura-details",
        component: FacturaDetailComponent,
        meta: {
          roles: ["Power User", "Administrador", "Encargado", "Agente"],
        },
      },
      {
        path: "/facturas2/:id",
        name: "factura-details2",
        component: FacturaPrintComponent,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },
      {
        path: "/facturas/new",
        name: "facturas-form",
        component: FacturaFormComp,
        meta: {
          roles: ["Power User", "Administrador", "Encargado", "Agente"],
        },
      },

      // ----------------------------------------------------------------------------

      // Area --------------------------------------------------------------------
      {
        path: "/areas",
        name: "areas",
        component: AreaComponent,
        meta: {
          roles: ["Power User"],
        },
      },
      {
        path: "/areas/:id",
        name: "area-details",
        component: AreaDetailComponent,
        meta: {
          roles: ["Power User"],
        },
      },
      {
        path: "/areas2/:id",
        name: "area-details2",
        component: AreaPrintComponent,
        meta: {
          roles: ["Power User"],
        },
      },
      {
        path: "/areas/new",
        name: "areas-form",
        component: AreaFormComp,
        meta: {
          roles: ["Power User"],
        },
      },

      // ----------------------------------------------------------------------------

      // chat
      {
        path: "/chat",
        name: "chat",
        component: ChatComponent,
        meta: {
          roles: ["Power User"],
        },
      },

      // Reporte --------------------------------------------------------------------
      {
        path: "/reportes",
        name: "reportes",
        component: ReporteComponent,
        meta: {
          roles: ["Power User", "Administrador", "Encargado", "Agente"],
        },
      },
      {
        path: "/reportes/:id",
        name: "reporte-details",
        component: ReporteDetailComponent,
        meta: {
          roles: ["Power User", "Administrador", "Encargado", "Agente"],
        },
      },
      {
        path: "/reportes2/:id",
        name: "reporte-details2",
        component: ReportePrintComponent,
        meta: {
          roles: ["Power User", "Administrador", "Encargado", "Agente"],
        },
      },
      {
        path: "/reportes/new",
        name: "reportes-form",
        component: ReporteFormComp,
        meta: {
          roles: ["Power User", "Administrador", "Encargado", "Agente"],
        },
      },

      // ----------------------------------------------------------------------------

      // Reporte2 --------------------------------------------------------------------
      {
        path: "/reporte2s",
        name: "reporte2s",
        component: Reporte2Component,
        meta: {
          roles: ["Power User", "Administrador", "Encargado", "Agente"],
        },
      },
      {
        path: "/reporte2s/:id",
        name: "reporte2-details",
        component: Reporte2DetailComponent,
        meta: {
          roles: ["Power User", "Administrador", "Encargado", "Agente"],
        },
      },
      {
        path: "/reporte2s2/:id",
        name: "reporte2-details2",
        component: Reporte2PrintComponent,
        meta: {
          roles: ["Power User", "Administrador", "Encargado", "Agente"],
        },
      },
      {
        path: "/reporte2s/new",
        name: "reporte2s-form",
        component: Reporte2FormComp,
        meta: {
          roles: ["Power User", "Administrador", "Encargado", "Agente"],
        },
      },

      // ----------------------------------------------------------------------------

      // Vitola --------------------------------------------------------------------
      {
        path: "/vitolas",
        name: "vitolas",
        component: VitolaComponent,
        meta: {
          roles: ["Power User", "Administrador"],
        },
      },
      {
        path: "/vitolas/:id",
        name: "vitola-details",
        component: VitolaDetailComponent,
        meta: {
          roles: ["Power User", "Administrador"],
        },
      },
      {
        path: "/vitolas2/:id",
        name: "vitola-details2",
        component: VitolaPrintComponent,
        meta: {
          roles: ["Power User", "Administrador"],
        },
      },
      {
        path: "/vitolas/new",
        name: "vitolas-form",
        component: VitolaFormComp,
        meta: {
          roles: ["Power User", "Administrador"],
        },
      },

      // ----------------------------------------------------------------------------

      // Funcion --------------------------------------------------------------------
      {
        path: "/funcions",
        name: "funcions",
        component: FuncionComponent,
        meta: {
          roles: ["Power User"],
        },
      },
      {
        path: "/funcions/:id",
        name: "funcion-details",
        component: FuncionDetailComponent,
        meta: {
          roles: ["Power User"],
        },
      },
      {
        path: "/funcions2/:id",
        name: "funcion-details2",
        component: FuncionPrintComponent,
        meta: {
          roles: ["Power User"],
        },
      },
      {
        path: "/funcions/new",
        name: "funcions-form",
        component: FuncionFormComp,
        meta: {
          roles: ["Power User"],
        },
      },

      // ----------------------------------------------------------------------------

      // Empleado --------------------------------------------------------------------
      {
        path: "/empleados",
        name: "empleados",
        component: EmpleadoComponent,
        meta: {
          roles: ["Power User", "Administrador"],
        },
      },
      {
        path: "/empleados/:id",
        name: "empleado-details",
        component: EmpleadoFormComp,
        meta: {
          roles: ["Power User", "Administrador"],
        },
      },
      {
        path: "/empleados2/:id",
        name: "empleado-details2",
        component: EmpleadoPrintComponent,
        meta: {
          roles: ["Power User", "Administrador"],
        },
      },
      {
        path: "/empleados/new",
        name: "empleados-form",
        component: EmpleadoFormComp,
        meta: {
          roles: ["Power User", "Administrador"],
        },
      },

      // ----------------------------------------------------------------------------

      // Liga --------------------------------------------------------------------
      {
        path: "/ligas",
        name: "ligas",
        component: LigaComponent,
        meta: {
          roles: ["Power User", "Administrador"],
        },
      },
      {
        path: "/ligas/:id",
        name: "liga-details",
        component: LigaFormComp,
        meta: {
          roles: ["Power User", "Administrador"],
        },
      },
      {
        path: "/ligas2/:id",
        name: "liga-details2",
        component: LigaPrintComponent,
        meta: {
          roles: ["Power User", "Administrador"],
        },
      },
      {
        path: "/ligas/new",
        name: "ligas-form",
        component: LigaFormComp,
        meta: {
          roles: ["Power User", "Administrador"],
        },
      },

      // ----------------------------------------------------------------------------

      // Cxp --------------------------------------------------------------------
      {
        path: "/cxps",
        name: "cxps",
        component: CxpComponent,
        meta: {
          roles: ["Power User", "Administrador"],
        },
      },
      {
        path: "/cxps/:id",
        name: "cxp-details",
        component: CxpFormComp,
        meta: {
          roles: ["Power User", "Administrador"],
        },
      },
      {
        path: "/cxps2/:id",
        name: "cxp-details2",
        component: CxpPrintComponent,
        meta: {
          roles: ["Power User", "Administrador"],
        },
      },
      {
        path: "/cxps/new",
        name: "cxps-form",
        component: CxpFormComp,
        meta: {
          roles: ["Power User", "Administrador"],
        },
      },

      // ----------------------------------------------------------------------------

      // Rueda --------------------------------------------------------------------
      {
        path: "/ruedas",
        name: "ruedas",
        component: RuedaComponent,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },
      {
        path: "/ruedas/:id",
        name: "rueda-details",
        component: RuedaFormComp,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },
      {
        path: "/ruedas2/:id",
        name: "rueda-details2",
        component: RuedaPrintComponent,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },
      {
        path: "/ruedas/new",
        name: "ruedas-form",
        component: RuedaFormComp,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },

      // ----------------------------------------------------------------------------
      
      // Recapada --------------------------------------------------------------------
      {
        path: "/recapadas",
        name: "recapadas",
        component: RecapadaComponent,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },
      {
        path: "/recapadas/:id",
        name: "recapada-details",
        component: RecapadaFormComp,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },
      {
        path: "/recapadas2/:id",
        name: "recapada-details2",
        component: RecapadaPrintComponent,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },
      {
        path: "/recapadas/new",
        name: "recapadas-form",
        component: RecapadaFormComp,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },

      // ----------------------------------------------------------------------------
      // Mono --------------------------------------------------------------------
      {
        path: "/monos",
        name: "monos",
        component: MonoComponent,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },
      {
        path: "/monos/:id",
        name: "mono-details",
        component: MonoFormComp,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },
      {
        path: "/monos2/:id",
        name: "mono-details2",
        component: MonoPrintComponent,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },
      {
        path: "/monos/new",
        name: "monos-form",
        component: MonoFormComp,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },

      // ----------------------------------------------------------------------------

      // Jornada --------------------------------------------------------------------
      {
        path: "/jornadas",
        name: "jornadas",
        component: JornadaComponent,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },
      {
        path: "/jornadas/:id",
        name: "jornada-details",
        component: JornadaFormComp,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },
      {
        path: "/jornadas2/:id",
        name: "jornada-details2",
        component: JornadaPrintComponent,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },
      {
        path: "/jornadas/new",
        name: "jornadas-form",
        component: JornadaFormComp,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },

      // ----------------------------------------------------------------------------

      // Pago --------------------------------------------------------------------
      {
        path: "/pagos",
        name: "pagos",
        component: PagoComponent,
        meta: {
          roles: ["Power User", "Administrador"],
        },
      },
      {
        path: "/pagos/:id",
        name: "pago-details",
        component: PagoFormComp,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },
      {
        path: "/pagos2/:id",
        name: "pago-details2",
        component: PagoPrintComponent,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },
      {
        path: "/pagosSeries/:id",
        name: "pago-detailsSeries",
        component: PagoPrintSeriesComponent,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },
      {
        path: "/pagos/new",
        name: "pagos-form",
        component: PagoFormComp,
        meta: {
          roles: ["Power User", "Administrador"],
        },
      },

      // ----------------------------------------------------------------------------
      // Nomina --------------------------------------------------------------------
      {
        path: "/nominas",
        name: "nominas",
        component: NominaComponent,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },
      {
        path: "/nominas/:id",
        name: "nomina-details",
        component: NominaFormComp,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },
      {
        path: "/nominas2/:id",
        name: "nomina-details2",
        component: NominaPrintComponent,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },
      {
        path: "/nominas/new",
        name: "nominas-form",
        component: NominaFormComp,
        meta: {
          roles: ["Power User", "Administrador"],
        },
      },

      // ----------------------------------------------------------------------------

      // Prestamo --------------------------------------------------------------------
      {
        path: "/prestamos",
        name: "prestamos",
        component: PrestamoComponent,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },
      {
        path: "/prestamos/:id",
        name: "prestamo-details",
        component: PrestamoFormComp,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },
      {
        path: "/prestamos2/:id",
        name: "prestamo-details2",
        component: PrestamoPrintComponent,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },
      {
        path: "/prestamos/new",
        name: "prestamos-form",
        component: PrestamoFormComp,
        meta: {
          roles: ["Power User", "Administrador", "Encargado"],
        },
      },

      // ----------------------------------------------------------------------------

      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          roles: ["Power User", "Administrador", "Agente", "Encargado"],
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.meta?.requiresAuth && store.state.isAuthenticated) {
    // let users enter if authenticated
    if (to.meta?.roles?.includes(store.state.user.type)) {
      next();
    } else {
      // console.log('User is not authorized for route.')
      alert("Usuario no Autorizado.");
    }
  } else if (to.meta?.requiresAuth) {
    // otherwise, route them to /login
    next("/");
  } else {
    next();
  }
});

export default router;
