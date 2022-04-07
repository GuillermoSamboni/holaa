<template>
  <div
    class="d-flex justify-content-between flex-wrap-reverse align-items-center"
  >
    <div class="col-sm-6">
      <div class="col-12 col-md-12">
        <h1 class="blod text-azul-sena text-capitalize">
          Ejecución de la Formación
        </h1>
        <p class="m-0 p-0 text-justify">
          Bajo la resolución 0526 están definidas nuestras funciones como grupo.
        </p>
      </div>
      <div class="col-sm-12">
        <div class="table-responsive">
          <paginate
            ref="paginator"
            name="listaPaises"
            :list="listaPaises"
            :per="2"
          >
            <table class="table table-hoverble">
              <thead id="listado">
                <tr>
                  <th scope="col">Funciones</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(paises, key) in paginated('listaPaises')"
                  :key="key"
                >
                  <td>{{ paises }}</td>
                </tr>
              </tbody>
            </table>
          </paginate>
        </div>
        <paginate-links
          class="pagination justify-content-end"
          for="listaPaises"
          :limit="2"
          :hide-single-page="true"
          :show-step-links="true"
          :full-page="true"
          :classes="{
            ul: 'simple-links-container',
            li: 'simple-links-item',
            liActive: ['simple-links-item', 'active1'],
            'li.active': 'active1',
          }"
        >
        </paginate-links>
      </div>
    </div>
    <img
      class="col-12 col-md-5 borde mb-5 mb-md-0"
      src="../../assets/bienestar/funciones.jpg"
      alt=""
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Axios from "@/Axios";

@Component({})
export default class Login extends Vue {
  listaPaises = [
    "1. Establecer orientaciones para el seguimiento a las variables (materiales de formación, ambientes de formación, instructores y aplicación de metodologías técnico pedagógicas) que afectan la calidad del proceso de ejecución de la formación en programas de formación, en modalidades presencial, virtual y a distancia.",
    "2. Verificar las cantidades y características de materiales de formación, ambientes de formación, recursos educativos, software, elementos de protección personal, herramientas, equipos necesarios e instructores requeridos para propender por la calidad y pertinencia de los procesos formativos.",
    "3. Diseñar e implementar instrumentos para el seguimiento al cumplimiento de las condiciones de los ambientes de formación, perfil de instructores, materiales de formación, con base en el programa de formación para que se asegure el desarrollo de las competencias en el aprendiz.",
    "4. Realizar seguimiento sobre la calidad de la información registrada por los Centros de Formación en el aplicativo de gestión académico a partir de la planeación y publicación de la oferta, ejecución de la formación y novedades de instructores y aprendices.",
    "5. Entregar indicaciones a las Regionales y Centros de Formación para la planeación y publicación de la oferta en coordinación con el grupo de Administración educativa.",
    "6. Proponer los lineamientos para que los centros de formación gestionen, desarrollen y monitoreen la etapa productiva de los aprendices como parte del proceso formativo que procure en el aprendiz la aplicabilidad de los conocimientos adquiridos durante su etapa lectiva, así como el seguimiento a cada alternativa establecida en el Reglamento de aprendices.",
    "7. Proponer lineamientos que permitan optimizar la utilización de los recursos didácticos y tecnológicos establecidos para la ejecución del proceso formativo en sus diferentes niveles y modalidades en cumplimiento de la misión institucional.",
    "8. Diseñar lineamientos para la ejecución y seguimiento de giras técnicas como estrategia de la formación para complementar y fortalecer los resultados de aprendizaje de las competencias desarrolladas por el aprendiz en los Centros de Formación.",
    "9. Establecer mecanismos conducentes a la obtención de certificaciones nacionales e internacionales de aprendices y ambientes, aportando a la calidad de la formación profesional y a la movilidad laboral del aprendiz.",
    "10. Diseñar e implementar los lineamientos estratégicos y operativos para ejecutar actividades de Proyección Social, establecida en el Plan Estratégico Institucional y Políticas Gubernamentales.",
    "11. Realizar los lineamientos para la operación del sistema nacional de bibliotecas garantizando la unidad técnica en los servicios de información como parte fundamental del proceso de formación profesional integral y de la investigación.",
    "12. Realizar los lineamientos para la ejecución del programa de Bilingüismo y el seguimiento a su gestión.",
    "13. Establecer los lineamientos y coordinar con las Regionales y los Centros de Formación Integral, la ejecución de los programas de desarrollo agropecuario del país.",
    "14. Administrar el programa de jóvenes en acción.",
    "15. Establecer los lineamientos y coordinar con las Regionales y los Centros de Formación Integral, la ejecución de la estrategia de aulas Móviles.",
    "16. Gestionar el desarrollo de estrategias de formación e innovación para el desarrollo de competencias y habilidades de los aprendices, tales como fórmula Sena Eco, WorldSkills, SENASOFT, Cocina Colombiana, entre otras, en Coordinación con los demás grupos de la Dirección de Formación Profesional y analizar los resultados como insumo para los diseños curriculares.",
    "17. Establecer los lineamientos estratégicos y operativos para ejecutar el Programa de Ampliación de Cobertura desde las Regionales y realizar el debido seguimiento a su ejecución.",
    "18. Diseñar los lineamientos del programa de Articulación con la Media a nivel nacional, orientar su implementación y realizar el seguimiento al mismo.",
    "19. Definir los lineamientos y evaluar la estrategia para el desarrollo de la Inducción a nuevos aprendices en las modalidades presencial, virtual y a distancia de los programas de formación. No aplica para programas de formación complementaria.",
    "20. Implementar la metodología de trabajo de la estrategia de redes adoptada por la Dirección de Formación Profesional.",
    "21. Analizar la información para presentar ante el comité de dotación y modernización de ambientes de formación profesional del Servicio Nacional de Aprendizaje SENA, y entregar el respectivo concepto técnico de acuerdo con las competencias del grupo.",
    "22. Proponer en articulación con los demás grupos de la Dirección de Formación Profesional las estrategias, procedimientos y medios de control para desarrollar la gestión del conocimiento.",
    "23. Las demás que les sean asignadas y que correspondan a la naturaleza del grupo.",
  ];
  paginate = ["listaPaises"];
}
</script>
