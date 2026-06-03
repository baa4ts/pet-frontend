import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

type Ausencia = {
  id: number;
  materia: string;
  fecha: string;
  createdAt: string;
  docente: { id: string; name: string; email: string };
  publicador: { id: string; name: string; email: string };
};

const c = {
  black: "#0a0a0a",
  white: "#ffffff",
  gray50: "#fafafa",
  gray200: "#e4e4e7",
  gray400: "#a1a1aa",
  gray500: "#71717a",
};

const FOOTER_HEIGHT = 58;
const SIG_HEIGHT = 110;

const s = StyleSheet.create({
  page: {
    backgroundColor: c.white,
    fontFamily: "Helvetica",
    paddingBottom: FOOTER_HEIGHT + SIG_HEIGHT,
  },

  topBar: { backgroundColor: c.black, height: 5 },

  content: { paddingHorizontal: 48, paddingTop: 28 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  orgName: { fontSize: 12, fontFamily: "Helvetica-Bold", color: c.black },
  orgSub: { fontSize: 8, color: c.gray500, letterSpacing: 0.4, marginTop: 2 },
  badgeWrap: { alignItems: "flex-end", gap: 3 },
  badge: {
    backgroundColor: c.black,
    color: c.white,
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 2,
    letterSpacing: 1,
  },
  docId: { fontSize: 8, color: c.gray400 },

  titleBlock: { marginBottom: 16 },
  title: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: c.black,
    letterSpacing: -0.3,
    marginBottom: 3,
  },
  titleMeta: { fontSize: 9, color: c.gray500 },

  bodySection: { marginBottom: 14 },
  bodyText: { fontSize: 9.5, color: c.black, lineHeight: 1.7, textAlign: "justify" },
  bodyTextMuted: {
    fontSize: 9.5,
    color: c.black,
    lineHeight: 1.7,
    textAlign: "justify",
    marginTop: 7,
  },

  dataSection: {
    backgroundColor: c.gray50,
    borderRadius: 5,
    padding: 14,
    gap: 8,
  },
  dataRow: { flexDirection: "row", alignItems: "flex-start" },
  dataLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: c.gray400,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    width: 100,
    paddingTop: 1,
  },
  dataRight: { flex: 1 },
  dataValue: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: c.black,
    marginBottom: 1,
  },
  dataSub: { fontSize: 8, color: c.gray500 },

  // Firmas — absolutas justo encima del footer
  sigSection: {
    position: "absolute",
    bottom: FOOTER_HEIGHT,
    left: 0,
    right: 0,
    backgroundColor: c.white,
    borderTop: `1px solid ${c.gray200}`,
    paddingHorizontal: 48,
    paddingTop: 16,
    paddingBottom: 14,
  },
  sigHeader: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: c.gray400,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 16,
  },
  sigRow: { flexDirection: "row", alignItems: "flex-end" },
  sigBox: { flex: 1, alignItems: "center" },
  sigArea: {
    width: "85%",
    height: 40,
    borderBottom: `1px solid ${c.gray400}`,
    marginBottom: 7,
  },
  sigName: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: c.black,
    marginBottom: 1,
    textAlign: "center",
  },
  sigRole: { fontSize: 7.5, color: c.gray500, textAlign: "center" },

  selloBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 2,
  },
  sello: {
    width: 64,
    height: 64,
    borderRadius: 32,
    border: `2px solid ${c.gray200}`,
    alignItems: "center",
    justifyContent: "center",
  },
  selloInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    border: `1px solid ${c.gray200}`,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  selloText: {
    fontSize: 5,
    fontFamily: "Helvetica-Bold",
    color: c.gray400,
    textAlign: "center",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  selloTextSub: { fontSize: 4, color: c.gray400, textAlign: "center" },

  // Footer — absolutas al fondo
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: FOOTER_HEIGHT,
    backgroundColor: c.gray50,
    borderTop: `1px solid ${c.gray200}`,
    paddingHorizontal: 48,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  footerDisclaimer: {
    fontSize: 7.5,
    fontFamily: "Helvetica-BoldOblique",
    color: c.gray500,
    textAlign: "center",
  },
  footerMeta: { fontSize: 7, color: c.gray400, textAlign: "center" },
});

export const AusenciaDocument = ({ ausencia }: { ausencia: Ausencia }) => {
  const fechaAusencia = new Date(ausencia.fecha).toLocaleDateString("es-UY", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const fechaEmision = new Date(ausencia.createdAt).toLocaleDateString("es-UY", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const ahora = new Date().toLocaleString("es-UY", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Document title={`Ausencia #${ausencia.id} - ${ausencia.docente.name}`}>
      <Page size="A4" style={s.page}>
        <View style={s.topBar} />

        <View style={s.content}>
          {/* Header */}
          <View style={s.header}>
            <View>
              <Text style={s.orgName}>Institucion Educativa</Text>
              <Text style={s.orgSub}>SISTEMA DE GESTION DE AUSENCIAS</Text>
            </View>
            <View style={s.badgeWrap}>
              <Text style={s.badge}>AUSENCIA DOCENTE</Text>
              <Text style={s.docId}>#{String(ausencia.id).padStart(5, "0")}</Text>
            </View>
          </View>

          {/* Titulo */}
          <View style={s.titleBlock}>
            <Text style={s.title}>Acta de Ausencia Docente</Text>
            <Text style={s.titleMeta}>Emitido el {fechaEmision}</Text>
          </View>

          {/* Cuerpo */}
          <View style={s.bodySection}>
            <Text style={s.bodyText}>
              Por medio del presente documento se deja constancia de la ausencia del/la
              docente{" "}
              <Text style={{ fontFamily: "Helvetica-Bold" }}>
                {ausencia.docente.name}
              </Text>
              , correspondiente a la asignatura{" "}
              <Text style={{ fontFamily: "Helvetica-Bold" }}>{ausencia.materia}</Text>,
              registrada el dia{" "}
              <Text style={{ fontFamily: "Helvetica-Bold" }}>{fechaAusencia}</Text>.
            </Text>
            <Text style={s.bodyTextMuted}>
              Dicha ausencia fue registrada en el sistema por{" "}
              <Text style={{ fontFamily: "Helvetica-Bold" }}>
                {ausencia.publicador.name}
              </Text>
              , quien certifica la veracidad de la informacion consignada en este
              documento. El presente acta queda archivada como constancia oficial en el
              legajo del docente mencionado, en conformidad con los procedimientos
              administrativos vigentes de la institucion.
            </Text>
          </View>

          {/* Datos */}
          <View style={s.dataSection}>
            <View style={s.dataRow}>
              <Text style={s.dataLabel}>Materia</Text>
              <View style={s.dataRight}>
                <Text style={s.dataValue}>{ausencia.materia}</Text>
              </View>
            </View>
            <View style={s.dataRow}>
              <Text style={s.dataLabel}>Fecha</Text>
              <View style={s.dataRight}>
                <Text style={s.dataValue}>{fechaAusencia}</Text>
              </View>
            </View>
            <View style={s.dataRow}>
              <Text style={s.dataLabel}>Docente</Text>
              <View style={s.dataRight}>
                <Text style={s.dataValue}>{ausencia.docente.name}</Text>
                <Text style={s.dataSub}>{ausencia.docente.email}</Text>
              </View>
            </View>
            <View style={s.dataRow}>
              <Text style={s.dataLabel}>Registrado por</Text>
              <View style={s.dataRight}>
                <Text style={s.dataValue}>{ausencia.publicador.name}</Text>
                <Text style={s.dataSub}>{ausencia.publicador.email}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Firmas — fijas justo encima del footer */}
        <View style={s.sigSection} fixed>
          <Text style={s.sigHeader}>Firmas y conformidad</Text>
          <View style={s.sigRow}>
            <View style={s.sigBox}>
              <View style={s.sigArea} />
              <Text style={s.sigName}>Director / Adscripto</Text>
              <Text style={s.sigRole}>Firma y aclaracion</Text>
            </View>

            <View style={s.selloBox}>
              <View style={s.sello}>
                <View style={s.selloInner}>
                  <Text style={s.selloText}>Institucion</Text>
                  <Text style={s.selloText}>Educativa</Text>
                  <Text style={s.selloTextSub}>────────</Text>
                  <Text style={s.selloText}>Sello</Text>
                  <Text style={s.selloText}>Oficial</Text>
                </View>
              </View>
            </View>

            <View style={s.sigBox}>
              <View style={s.sigArea} />
              <Text style={s.sigName}>{ausencia.docente.name}</Text>
              <Text style={s.sigRole}>Docente implicado · Firma y aclaracion</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={s.footer} fixed>
          <Text style={s.footerDisclaimer}>
            Este documento no tiene validez sin la firma de ambos implicados y el sello
            institucional.
          </Text>
          <Text style={s.footerMeta}>
            Generado el {ahora} · Ausencia #{ausencia.id} · {ausencia.materia}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
