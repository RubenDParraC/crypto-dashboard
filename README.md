# Crypto Dashboard - React Native

## Resumen del Proyecto

Crypto Dashboard es una aplicación móvil construida con **React Native** que muestra los precios de criptomonedas en tiempo (casi) real.

El enfoque principal de la aplicación es **performance**, **arquitectura escalable**, **soporte offline-first** y una **experiencia de usuario fluida**.

> Nota: La UI es funcional y simple. La evaluación prioriza decisiones técnicas, arquitectura y optimización sobre diseño estético.

---

## Funcionalidades

- Visualizar **+200 activos** de criptomonedas.
- Actualización de precios en **tiempo casi real** (polling cada 10 segundos).
- Indicadores de **tendencia de precio**: sube, baja o igual.
- **Offline-first**: persistencia local con `AsyncStorage`.
- **Pull-to-refresh** para actualización manual.
- Soporte para **modo oscuro y claro**.
- Listado eficiente y fluido con **FlashList** (Shopify) incluso con actualizaciones frecuentes.

---

## Arquitectura

Se implementa una **Arquitectura Modular por Features**, inspirada en principios de Clean Architecture.

### Decisiones Arquitectónicas Clave

- **Capa de Dominio**: `CryptoAssetType` y `CryptoApiType` son independientes de UI.
- **Capa de Datos**:
  - API (`fetchPrices`) consume la API pública de Binance.
  - Local (`AsyncStorage`) almacena los últimos precios para modo offline.
- **Capa de Presentación**:
  - Componentes reutilizables y memoizados.
  - `CryptoRow` con animaciones suaves de cambios de precio.
  - `Skeleton` para mostrar placeholders durante la carga.
- **Hooks**:
  - `useCryptoPolling` controla polling, cálculo de tendencia, caching offline y manejo del ciclo de vida.
- **Offline-first**: La app carga datos en caché si la API falla.

---

## Flujo de Datos

1. `CryptoDashboard` usa el hook `useCryptoPolling`.
2. `useCryptoPolling` obtiene los datos de la API (`fetchPrices`).
3. Compara los precios previos para determinar la tendencia (`up`, `down`, `same`).
4. Guarda los datos en `AsyncStorage`.
5. `CryptoRow` renderiza cada activo con animación de tendencia.
6. Pull-to-refresh ejecuta `refresh` en el hook para actualización manual.

---

## Optimización y Rendimiento

- **FlashList**:
  - Renderiza +200 items eficientemente.
  - `keyExtractor` estable.
  - Componentes memoizados (`CryptoRow`) evitan re-render innecesario.
- **Animaciones de tendencia**:
  - `Animated` API para transiciones suaves de color en cambios de precio.
- **Polling eficiente**:
  - Intervalo de 10 segundos.
  - AbortController y limpieza de intervalos al desmontar o pasar a background.
- **Offline-first**:
  - Carga datos previamente guardados para mantener la app funcional sin conexión.

---

## Componentes Clave

- **CryptoRow**: Renderiza cada criptomoneda con precio, tendencia y cambio de 24h.
- **HeaderComponent**: Encabezado con toggle de tema (dark/light).
- **Skeleton**: Placeholder animado mientras se cargan los datos.
- **IconComponent**: Abstracción de iconos con soporte para múltiples sets (`AntDesign`, `FontAwesome`, etc.)
- **useCryptoPolling**: Hook personalizado que maneja:
  - Polling de API
  - Cálculo de tendencia
  - Caché offline
  - Estado de carga y error

---

## Tech Stack

- **React Native** (Expo Managed)
- **TypeScript** para tipado estricto
- **FlashList** (Shopify) para listas de alto rendimiento
- **AsyncStorage** para persistencia offline
- **Animated API** para animaciones
- **NativeWind** para estilos (Tailwind CSS en RN)
- **Hooks** para gestión de estado y polling

---

## Cómo Ejecutar el Proyecto

### Requisitos Previos

- Node.js >= 18
- Expo CLI (`npm install -g expo-cli`)
- Android Studio / Xcode (o Expo Go en un dispositivo real - OPCIÓN RECOMENDADA)

### Instalación y ejecución

1. Clonar el repositorio:
   `git clone https://github.com/RubenDParraC/crypto-dashboard.git`
2. Ir al proyecto:
   `cd crypto-dashboard`
3. Instalar dependencias:
   `npm install`
4. Iniciar servidor de desarrollo:
   `npx expo start`
5. Abrir en dispositivo o simulador:
6. Expo Go en tu dispositivo móvil (escanea QR)
7. iOS Simulator: presiona `i`
8. Android Emulator: presiona `a`

### Mejoras Futuras

- Integrar WebSocket para actualizaciones verdaderamente en tiempo real.
- Añadir tests unitarios e integración (Jest + Testing Library).
- Persistencia más robusta con SQLite.
- Funcionalidades de búsqueda, filtrado y ordenamiento de activos.
- Implementar feature flags y configuración por entorno.
- Optimizar aún más FlashList con getItemLayout si fuese necesario.

### Notas Técnicas

Este proyecto demuestra:

- Gestión eficiente de estado y datos en React Native.
- Principios de Offline-first y caching.
- Renderizado de listas grandes con FlashList.
- Arquitectura limpia y modular, escalable a futuras features.
- Control de ciclos de vida, memoria y eficiencia de red.
