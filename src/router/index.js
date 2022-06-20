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
