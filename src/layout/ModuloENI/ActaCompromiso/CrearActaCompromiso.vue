<template>
  <div>
    <div class="container-fluid" id="imprimible">
      <table border="1">
        <thead>
          <tr>
            <td rowspan="2" class="header-table text-center">
              <img src="@/assets/logoSena.png" alt="" />
            </td>
            <td>Versión: 03</td>
          </tr>
          <tr>
            <td>Código: GTH-F-136</td>
          </tr>
        </thead>
      </table>
      <table border="1">
        <tbody>
          <tr>
            <td class="text-center subtitulo">
              <strong>PROCESO GESTIÓN DEL TALENTO HUMANO</strong>
            </td>
          </tr>

          <tr>
            <td class="text-center subtitulo">
              <strong>
                FORMATO ACTA DE COMPROMISO CAPACITACIÓN SERVIDORES PÚBLICOS-
                INSTRUCTORES</strong
              >
            </td>
          </tr>

          <tr>
            <td><strong>1. DESIGNACIÓN DEL BENEFICIARIO: </strong></td>
          </tr>
          <!-- cuerpo de la tabla -->
          <table>
            <tbody>
              <tr>
                <td class="pr-2">El suscrito</td> <td class="linea-botom pr-7">{{acta_compromiso_data.subdirector}}</td>
                <td  class="pr-2">Subdirector del  Centro</td> <td class="linea-botom">{{acta_compromiso_data.centro}}</td>
              </tr>
              
            </tbody>
          </table>
          <table>
              <tr>
                  <p>Atendiendo al Plan de Capacitación previsto para la presente vigencia, se permite autorizar al siguiente instrucor (a) para participar en el evento que se señala, lo cual obedece a ruta de fortalecimiento técnica y predagógica en la que desempeña su funcion de INSTRUCTOR. </p>
              </tr>
          </table>
          <table>
            <tr>
                <td class="pr-2">Nombres y Apellidos del Instructor:</td> <td class="linea-botom pr-7">{{acta_compromiso_data.instructor}}</td>
                <td  class="pr-2">Cargo:</td> <td class="linea-botom">{{acta_compromiso_data.cargo}}</td>
              </tr>
          </table>

          <table>
            <tr>
                <td class="pr-2">N° de Identificación:</td> <td class="linea-botom pr-7">{{acta_compromiso_data.identificacion}}</td>
                <td  class="pr-2">N° IP SENA:</td> <td class="linea-botom">{{acta_compromiso_data.ip_sena}}</td>
              </tr>
          </table>

          <table>
            <tr>
                <td class="pr-2">Red de conocimiento:</td> <td class="linea-botom pr-7">{{acta_compromiso_data.red_conocimiento}}</td>
                <td  class="pr-2">Área temática:</td> <td class="linea-botom">{{acta_compromiso_data.area}}</td>
              </tr>
          </table>

          <table>
            <tr>
                <td class="pr-2">Correo electrónico:</td> <td class="linea-botom pr-7"> {{acta_compromiso_data.correo}}</td>
                <td  class="pr-2"> N° Celular:</td> <td class="linea-botom">{{acta_compromiso_data.numero_telefono}}</td>
              </tr>
          </table>

          <table>
            <tr>
                <td class="pr-2">Regional:</td> <td class="linea-botom pr-7">{{acta_compromiso_data.regional}} </td>
                <td  class="pr-2">Centro:</td> <td class="linea-botom">{{acta_compromiso_data.centro}}</td>
              </tr>
          </table>

          <table>
            <tr>
                <td class="pr-2">Nombre del evento de capacitación:</td> 
                <td  class="pr-2  linea-botom" >{{acta_compromiso_data.nombre_evento}}</td>
              </tr>
          </table>

          <table>
            <tr>
                <td class="pr-2">Sede del evento y ciudad: </td> 
                <td  class="pr-2 linea-botom">{{acta_compromiso_data.sede}}</td>
              </tr>
          </table>

          <table class="mb-4">
            <tr>
                <td class="pr-2">Fecha Inicio del Evento:</td> <td class="linea-botom pr-7">{{acta_compromiso_data.fecha_inicio_evento}}</td>
                <td  class="pr-2">Fecha Fin del Evento:</td> <td class="linea-botom">{{acta_compromiso_data.fecha_fin_evento}}</td>
              </tr>
          </table>

          

          <!-- jefferson -->

          <tr>
            <td><strong>2. COMPROMISOS DEL BENEFICIARIO: </strong></td>
          </tr>

          <tr>
            <td>
              El instructor beneficiario de la capacitación deberá cumplir con
              las siguientes obligaciones: <br />
              <strong>2.1.</strong> Asistir y participar en la actividad de
              capacitación al 100% de la intensidad horaria prevista.<br />
              <strong>2.2.</strong> Presentar a su Jefe Inmediato, al finalizar
              el evento o cada nivel, una certificación de asistencia y/o
              aprobación como requisito para continuar y/o ser beneficiario de
              futuras capacitaciones, en el caso de que el curso esté
              estructurado por niveles.<br />
              <strong>2.3.</strong> Presentar la certificación obtenida a la
              Subdirección del Centro, dentro de los cinco(5) días siguientes a
              la finalización de la capacitación.<br />
              <strong>2.4.</strong> Cumplir con la función de agente
              multiplicador de los conocimientos y habilidades adquiridas,
              dentro o fuera de la Entidad cuando se le requiera. <br />
              <strong>2.5.</strong> Asistir a la capacitación en buenas
              condiciones físicas y mentales. <strong>2.6.</strong> Diligenciar
              las evaluaciones de capacitación e impacto.
            </td>
          </tr>
          <br />

          <tr>
            <td><strong>3. SANCIONES POR INCUMPLIMIENTO: </strong></td>
          </tr>
          <tr>
            <td>
              En caso de incumplimiento sin justificación idónea, el funcionario
              capacitado será sancionado de la siguiente manera:<br />
              <strong>3.1</strong> No será objeto de capacitación durante los
              siguientes doce meses contados a partir de la fecha en que se
              genera el incumplimiento.<br />
              <strong>3.2</strong> Deberá reintegrar el 100% del valor que la
              entidad invirtió para su participación.<br />
              <strong>3.3</strong> Si el funcionario beneficiario de
              capacitación una vez iniciada la acción de capacitación desiste de
              su participación o se retira de la entidad deberá reintegrar el
              valor total de la inversión en la que incurrió la entidad.<br />
            </td>
          </tr>

          <tr>
            <td>
              <strong
                >4. PLAN DE MULTIPLICACIÓN Y/O APLICACIÓN DE LOS
                CONOCIMIENTOS</strong
              >
            </td>
          </tr>
          <tr>
            <td>
              <strong>4.1</strong> El Instructor se compromete a aplicar los
              conocimientos y/o habilidades adquiridos en la capacitación en su
              quehacer de la siguiente manera: (Seleccione una (1) opción).<br />
              <table>
                <tr>
                  <td class="border border-oscuro-sena pl-5"></td>

                  <td>
                    Diseño curricular de un programa para instructores de la red
                    en la temática del programa recibido, en coordinacion con la
                    ENI.
                  </td>
                </tr>

                <tr>
                  <td class="border border-oscuro-sena pl-5"></td>

                  <td>
                    Desarrollo curricular (Elaboracion de guias, talleres,
                    materiales de apoyo) del programa recibido, en coordinacion
                    con la ENI.
                  </td>
                </tr>

                <tr>
                  <td class="border border-oscuro-sena pl-5"></td>

                  <td>
                    Orientar formación a instructores en la temática del
                    programa recibido con los programas diseñados por al ENI.
                  </td>
                </tr>

                <tr>
                  <td class="border border-oscuro-sena pl-5"></td>

                  <td>
                    Elaborar un artículo (técnico / pedagógico) para la revista
                    RUTAS PEDAGÓGICAS, según estándares ENI.
                  </td>
                </tr>

                <tr>
                  <td class="border border-oscuro-sena pl-5"></td>

                  <td>
                    Desarrollar EDT (Eventos de divulgación tecnológica), para
                    aprendices y empresarios coordinado con el Centro.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td><strong>Observaciones </strong></td>
          </tr>
          <tr>
            <td class="border border-oscuro-sena p-5"></td>
          </tr>
          <!-- <tr>
            <td>
              El jefe inmediato se compromete a verificar el desarrollo de los
              compromisos adquiridos en esta acta de compromiso. El instructor
              se compromete a gestionar con al ENI el desarrollo de la acción de
              multiplicación definida en esta acta.
            </td>
          </tr> -->

          <div class="mb-5">
        El jefe inmediato se compromete a verificar el desarrollo de los
        compromisos adquiridos en esta acta de compromiso. El instructor
        se compromete a gestionar con al ENI el desarrollo de la acción de
        multiplicación definida en esta acta.
      </div>

      <div class="mt-6">
        <hr style="width: 40%; margin-left: 0%;" class="mb--1">
        <p class="mb--1">Firma Jefe Inmediato</p>
        <p class="mb--1">NOMBRE DEL JEFE INMEDIATO: {{ acta_compromiso_data.subdirector}}</p>
        <p >N° Cedula</p>

      </div>
      <div class="m-1 mb-4">
        <p>
          Declaro que al momento de presentar esta acta de compromiso, conozco y acepto los reglamentos y normas vigentes.
          En constancia de haber leído, entendido y aceptado lo anterior, firmo.
        </p>
      </div>

      <div class="mt-6">
        <hr style="width: 40%; margin-left: 0%;" class="mb--1">
        <p class="mb--1">Firma Instructor</p>
        <p class="mb--1">NOMBRE DEL INSTRUCTOR: {{acta_compromiso_data.instructor}}</p>
        <p>N° Cedula</p>

      </div>
        </tbody>
      </table>
      <!-- <a href="javascript:imprSelec('imprimible')" >Imprimir texto</a> -->
      
    </div>
  </div>
</template>

<script >
	function imprSelec(nombre) {
	  var ficha = document.getElementById(nombre);
	  var ventimp = window.open(' ', 'popimpr');
	  ventimp.document.write( ficha.innerHTML );
	  ventimp.document.close();
	  ventimp.print( );
	  ventimp.close();
	}
</script>


<script lang="ts">

import { Component, Vue } from "vue-property-decorator";

import AnimacionCargando from "../../../components/animacionCargando.vue";

@Component({
  components: {
    AnimacionCargando,
  },
})
export default class CrearActaCompromiso extends Vue {

  // variables acta de compromiso
  acta_compromiso_data = {
    subdirector : 'Matias Lopez rodriguez',
    instructor : 'valentina fernandez gimenez',
    cargo :'ingeniero de software',
    identificacion : '565632563',
    ip_sena : '78278372',
    red_conocimiento : 'informatica y desarrollo  de software',
    area : 'programacion web',
    correo : 'valentina17@misena.edu.co',
    numero_telefono : '3145782314',
    regional : 'Cauca',
    centro : 'centro de teleinformatica y produccion industrial',
    nombre_evento : 'evento para la capacitacion de nuevas tecnologias',
    sede : 'valle del cauca ',
    fecha_inicio_evento : '12/12/2020',
    fecha_fin_evento : '01/13/2021',
  }
  

}

</script>
c