<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const hasilPrediksi = ref({
  status: 'Memuat...',
  score: 0,
  faktorDominan: [],
  rekomendasi: []
})

onMounted(() => {
  if (history.state && history.state.dataPrediksi) {
    hasilPrediksi.value = history.state.dataPrediksi;
    const sessionId = hasilPrediksi.value.sessionId || hasilPrediksi.value.session_id;
    const urlHf = "https://gracehdyc-stress-predict-api.hf.space";
    if (sessionId) {
      const intervalCek = setInterval(async () => {
        try {
          const response = await fetch(`${urlHf}/api/recommendation/${sessionId}`);
          if (response.ok) {
            const dataRes = await response.json();
            if (dataRes.ready) {
              hasilPrediksi.value.rekomendasi = dataRes.rekomendasi;
              clearInterval(intervalCek);
            }
          }
        } catch (error) {
          console.error("Gagal memuat rekomendasi otomatis:", error);
        }
      }, 1000);
    }
  } else {
    
    hasilPrediksi.value = {
      status: 'No Data',
      score: 0,
      faktorDominan: ['Isi form terlebih dahulu'],
      rekomendasi: []
    };
    router.push('/prediksi');
  }
})


const statusType = computed(() => {
  const status = hasilPrediksi.value.status.toLowerCase()
  if (status.includes('high') || status.includes('tinggi')) return 'high'
  if (status.includes('moderate') || status.includes('sedang')) return 'moderate'
  return 'low'
})


const bannerIcon = computed(() => {
  if (statusType.value === 'low') {
    
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>`
  } else {
    
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>`
  }
})


const bannerClass = computed(() => {
  if (statusType.value === 'high') return 'border-red bg-red-light'
  if (statusType.value === 'moderate') return 'border-orange bg-orange-light'
  return 'border-green bg-green-light'
})


const statusTextClass = computed(() => {
  if (statusType.value === 'high') return 'text-red'
  if (statusType.value === 'moderate') return 'text-orange'
  return 'text-soft-green'
})


const iconClass = computed(() => {
  if (statusType.value === 'high') return 'text-red bg-red-light-icon'
  if (statusType.value === 'moderate') return 'text-orange bg-orange-light-icon'
  return 'text-soft-green bg-green-light-icon'
})

const gaugeColor = computed(() => {
  if (statusType.value === 'high') return '#ef4444' 
  if (statusType.value === 'moderate') return '#fbbf24' 
  return '#B4DEBD' 
})
</script>

<template>
  <div class="halaman-hasil min-h-screen text-charcoal bg-white">
    <header class="main-header text-white">
      <nav class="navbar container">
        <div class="nav-brand">
          <span>StressPredict</span>
        </div>
        <div class="nav-links">
          <router-link to="/" class="nav-link text-white">Beranda</router-link>
          <router-link to="/prediksi" class="nav-btn-active text-mint">Prediksi</router-link>
          <router-link to="/dashboard" class="nav-link text-white">Dashboard</router-link>
        </div>
      </nav>
      <div class="hero-center container">
        <h1>Hasil Prediksi Stress</h1>
        <p>Analisis kondisi mental Anda berbasis Machine Learning</p>
      </div>
    </header>

    <section class="section-results bg-cream">
      <div class="container max-w-results">
        <div class="card card-results-body bg-white">
          
          <div class="status-banner" :class="bannerClass">
            <div class="status-left">
              <div class="check-circle" :class="iconClass" v-html="bannerIcon"></div>
              <div>
                <p class="banner-tag text-muted-grey">Hasil Analisis</p>
                <h2 :class="statusTextClass">{{ hasilPrediksi.status }}</h2>
              </div>
            </div>
  
          </div>

          <div class="disclaimer-card">
            <p><strong>Disclaimer:</strong> Platform ini bukan alat diagnosis medis profesional formal. Konsultasikan dengan psikolog kampus jika Anda membutuhkan penanganan mendalam lebih lanjut.</p>
          </div>

          <div class="factors-section">
            <h4 class="text-muted-grey">Faktor Penyebab Dominan</h4>
            <div class="factors-list">
              <div v-for="(faktor, i) in hasilPrediksi.faktorDominan" :key="i" class="factor-row bg-white">
                <span class="factor-index bg-blue text-white">{{ i + 1 }}</span>
                <span class="factor-name text-charcoal">{{ faktor }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <div class="container max-w-results jarak-layout">
        <div class="card card-body-custom bg-white">
          <h3 class="section-form-title border-purple text-soft-purple">Rekomendasi Penanganan: </h3>
          <ul class="rekomendasi-list-container mt-4">
            <li v-for="(item, index) in hasilPrediksi.rekomendasi" :key="index" class="rekomendasi-item-box text-charcoal">
              <span class="badge-number">{{ index + 1 }}</span>
              <p>{{ item }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <footer class="main-footer bg-footer text-muted-grey">
      <div class="container grid-3">
        <div>
          <span class="footer-brand text-white">StressPredict</span>
          <p class="footer-desc">Sistem prediksi stres mahasiswa berbasis machine learning untuk mendukung kesehatan mental akademik.</p>
        </div>
        <div class="footer-links-col">
          <h4 class="text-white">Navigasi</h4>
          <router-link to="/" class="text-muted-grey">Beranda</router-link>
          <router-link to="/prediksi" class="text-muted-grey">Prediksi Stres</router-link>
          <router-link to="/dashboard" class="text-muted-grey">Dashboard Analitik</router-link>
        </div>
        <div>
          <h4 class="text-white">Kontak & Sumber</h4>
          <p>stresspredict@gmail.com</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
.halaman-hasil { font-family: 'Poppins', sans-serif; }

.main-header { background-color: #91C4C3; }
.bg-cream { background-color: #FFF7DD; }
.bg-white { background-color: #FFFFFF; }
.bg-dark-slate { background-color: #2C3A47; }
.line-gradient { background: linear-gradient(to right, #B4DEBD, #FFF7DD, #f87171); }
.bg-blue { background-color: #80A1BA; }
.border-blue { border-color: #80A1BA; }
.bg-footer { background-color: #2C3A47; }
.mt-6 { margin-top: 24px; }

.text-white { color: #FFFFFF; }
.text-mint { color: #91C4C3; }
.text-soft-blue { color: #80A1BA; }
.text-charcoal { color: #6B7280; }
.text-muted-grey { color: #9CA3AF; }

.border-red { border-color: #f87171 !important; }
.bg-red-light { background-color: #FFF5F5 !important; border-color: #FEB2B2 !important; }
.bg-red-light-icon { background-color: #FED7D7 !important; }
.text-red { color: #E53E3E !important; }

.border-orange { border-color: #fbbf24 !important; }
.bg-orange-light { background-color: #FFFDF2 !important; border-color: #FDE047 !important; }
.bg-orange-light-icon { background-color: #FEF08A !important; }
.text-orange { color: #D97706 !important; }

.border-green { border-color: #B4DEBD !important; }
.bg-green-light { background-color: #f8faf8 !important; border-color: #B4DEBD !important; }
.bg-green-light-icon { background-color: rgba(180, 222, 189, 0.3) !important; }
.text-soft-green { color: #87b390 !important; }

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; box-sizing: border-box; }
.max-w-results { max-width: 896px; }
.grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; }
.grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px; }

.navbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; }
.nav-brand { font-weight: 700; font-size: 1.25rem; color: #FFFFFF; }
.nav-links { display: flex; align-items: center; gap: 24px; }
.nav-link { text-decoration: none; font-weight: 500; }
.nav-btn-active { background-color: #FFFFFF; padding: 6px 18px; border-radius: 9999px; text-decoration: none; font-weight: 600; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }

.hero-center { text-align: center; padding: 48px 0; }
.hero-center h1 { font-size: 2.5rem; font-weight: 800; margin: 0 0 8px 0; }
.hero-center p { font-size: 1rem; color: #FFFFFF; font-weight: 300; margin: 0; }

.section-results { padding: 64px 0; }
.card-results-body { padding: 48px; border-radius: 24px; border: 1px solid #F3F4F6; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 40px; }
.card-body-custom { padding: 48px; border-radius: 24px; border: 1px solid #F3F4F6; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); }

.status-banner { display: flex; justify-content: space-between; align-items: center; border: 1px solid; padding: 24px; border-radius: 16px; flex-wrap: wrap; gap: 16px; transition: 0.3s; }
.status-left { display: flex; align-items: center; gap: 16px; }
.check-circle { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
.check-circle :deep(svg) { width: 22px; height: 22px; }
.banner-tag { font-size: 11px; font-weight: 700; text-transform: uppercase; margin: 0 0 2px 0; }
.status-left h2 { font-size: 1.5rem; font-weight: 800; margin: 0; transition: 0.3s; }
.status-right { text-align: right; }
.score-num { font-size: 2.25rem; font-weight: 900; display: block; line-height: 1; }
.score-label { font-size: 11px; font-weight: 700; margin: 4px 0 0 0; }

.chart-inner-card { padding: 32px; display: flex; flex-direction: column; align-items: center; background-color: rgba(249, 250, 251, 0.3); }
.chart-inner-card h4, .slider-section h4, .factors-section h4 { font-size: 0.875rem; font-weight: 700; margin: 0 0 24px 0; align-self: flex-start; }
.gauge-box { width: 192px; height: 96px; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; }
.gauge-svg { width: 100%; height: 100%; }
.gauge-svg path { transition: stroke-dashoffset 0.8s ease-in-out, stroke 0.5s ease; }
.gauge-val { position: absolute; bottom: 0; font-size: 1.25rem; font-weight: 700; }
.radar-box { width: 110px; height: 110px; display: flex; align-items: center; justify-content: center; }
.radar-svg { width: 100%; height: 100%; }
.radar-svg :deep(polygon) { transition: points 0.8s ease-in-out, fill 0.5s ease, stroke 0.5s ease; }

.slider-track-container { position: relative; padding-top: 24px; margin-top: 16px; }
.slider-track { height: 12px; width: 100%; border-radius: 9999px; }
.slider-pointer { position: absolute; top: 0; display: flex; flex-direction: column; align-items: center; transform: translateX(-50%); transition: left 0.8s ease-in-out; }
.pointer-dot { width: 16px; height: 16px; border: 4px solid; border-radius: 50%; box-shadow: 0 4px 6px rgba(0,0,0,0.1); background-color: #ffffff; transition: border-color 0.5s ease; }
.pointer-val { font-size: 11px; font-weight: 700; margin-top: 4px; transition: color 0.5s ease; }

.factors-list { display: flex; flex-direction: column; gap: 12px; }
.factor-row { display: flex; align-items: center; gap: 16px; padding: 16px; border: 1px solid #F3F4F6; border-radius: 12px; }
.factor-index { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; }
.factor-name { font-size: 0.875rem; font-weight: 500; }
.disclaimer-card { margin-top: 16px; padding: 16px; background-color: #F9FAFB; border-radius: 12px; font-size: 0.8rem; color: #9CA3AF; border-left: 4px solid #E5E7EB; }
.section-form-title { font-size: 1.125rem; font-weight: 700; margin: 0; padding-bottom: 12px; border-bottom: 2px solid #E5E7EB; }
.text-soft-purple { color: #8B8EAD; }
.border-purple { border-color: #8B8EAD; }

.rekomendasi-list-container { display: flex; flex-direction: column; gap: 16px; list-style: none; padding: 0; margin: 0; }
.rekomendasi-item-box { display: flex; align-items: flex-start; gap: 14px; padding: 16px 20px; background-color: #FFF7DD; border-radius: 12px; border: 1px solid #E5E7EB; }
.rekomendasi-item-box p { margin: 0; font-size: 0.95rem; line-height: 1.5; color: #374151; text-align: left; }
.badge-number { background-color: #80A1BA; color: white; font-weight: 700; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.85rem; }

.main-footer { padding: 80px 0; }
.footer-brand { font-size: 1.5rem; font-weight: 700; }
.footer-desc { font-weight: 300; margin-top: 16px; line-height: 1.6; }
.main-footer h4 { font-size: 1.125rem; font-weight: 600; margin: 0 0 24px 0; }
.footer-links-col { display: flex; flex-direction: column; gap: 12px; }
</style>