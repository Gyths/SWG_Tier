// Simulación para NextRequest y NextResponse que next-auth podría intentar importar.
// Next-auth espera estas exportaciones para manejar el entorno Edge/Node.
export class NextRequest {}
export class NextResponse {}

// Exporta una función vacía por si next-auth usa getServerSession o similares que provienen
// de next-auth/next que a su vez importa de next/server en algunas configuraciones.
export default {};