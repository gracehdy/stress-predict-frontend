<script setup>
import { ref } from 'vue'

const statistikCards = ref([
  { angka: '1,000+', label: 'Data Mahasiswa' },
  { angka: '94.2%', label: 'Akurasi Model' },
  { angka: '14', label: 'Fitur Analisis' },
  { angka: '3', label: 'Kategori Stres' }
])

const fiturUnggulan = ref([
  { title: 'Prediksi Tingkat Stres', desc: 'Analisis tingkat stres berdasarkan kondisi akademik dan gaya hidup menggunakan model ML yang akurat.' },
  { title: 'Analisis Faktor Penyebab', desc: 'Identifikasi faktor dominan yang berkontribusi pada stres seperti beban ujian, kurang tidur, dan lainnya.' },
  { title: 'Rekomendasi Kesehatan Mental', desc: 'Dapatkan saran berbasis data untuk meningkatkan kesejahteraan mental dan mengelola stres secara efektif.' },
  { title: 'Dashboard Statistik', desc: 'Visualisasi distribusi stres mahasiswa dengan grafik interaktif yang mudah dipahami.' }
])

const tujuanItems = ref([
  'Membantu mahasiswa mengenali tingkat stres sedini mungkin',
  'Mendorong gaya hidup sehat dan keseimbangan akademik',
  'Menyediakan data berbasis bukti untuk institusi pendidikan',
  'Mengurangi stigma terkait kesehatan mental di lingkungan kampus'
])

const manfaatItems = ref([
  { label: 'Mahasiswa lebih sadar akan kesehatan mentalnya', persen: 73 },
  { label: 'Peningkatan performa akademik setelah intervensi dini', persen: 65 },
  { label: 'Efektivitas rekomendasi berbasis data vs umum', persen: 81 }
])

const targetPengguna = ref([
  { title: 'Mahasiswa aktif yang ingin memantau tingkat stres dan kesehatan mental secara mandiri.' },
  { title: 'Konselor & psikolog kampus untuk melakukan skrining awal kondisi mahasiswa.' },
  { title: 'Peneliti pendidikan dan kesehatan mental yang membutuhkan data empiris.' },
  { title: 'Institusi akademik untuk program wellness dan kebijakan intervensi dini.' }
])

const IkonChartUp = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18M19 9l-5 5-4-4-3 3"/></svg>';
const IkonPlus = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
</script>

<template>
  <div class="halaman-beranda bg-white text-charcoal">
    
    <header class="main-header text-white">
      <nav class="navbar container">
        <div class="nav-brand">
          <span>StressPredict</span>
        </div>
        <div class="nav-links">
          <router-link to="/" class="nav-btn-active text-mint">Beranda</router-link>
          <router-link to="/prediksi" class="nav-link text-white">Prediksi</router-link>
          <router-link to="/dashboard" class="nav-link text-white">Dashboard</router-link>
        </div>
      </nav>

      <div class="hero-center container">
        <h1>Student Stress Prediction System</h1>
        <p>Sistem berbasis machine learning untuk memprediksi tingkat stres mahasiswa berdasarkan kondisi akademik dan gaya hidup.</p>
        <div class="hero-actions-panel">
          <router-link to="/prediksi" class="btn-hero-primary text-white">Mulai Prediksi Tingkat Stress Anda!</router-link>
          <router-link to="/dashboard" class="btn-hero-secondary text-soft-blue">
            <div class="cta-icon-svg" v-html="IkonChartUp"></div> Lihat Dashboard
          </router-link>
        </div>
      </div>
    </header>


    <section class="section-content-wide bg-cream">
      <div class="container">
        <h2 class="block-main-title text-mint">Fitur Unggulan</h2>
        <p class="block-main-subtitle text-charcoal">Empat pilar utama sistem prediksi stres mahasiswa : </p>
        <div class="grid-2">
          <div v-for="(fitur, index) in fiturUnggulan" :key="index" class="card-feature-box bg-white">
            <h3>{{ fitur.title }}</h3>
            <p class="text-charcoal">{{ fitur.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-content-wide bg-white">
      <div class="container grid-2 items-start">
        <div>
          <h2 class="block-side-title text-mint">Tujuan Website</h2>
          <p class="block-side-subtitle text-charcoal">Platform ini dirancang untuk mendukung kesehatan mental mahasiswa melalui teknologi prediktif.</p>
          <div class="stack-list-vertical">
            <div v-for="(tujuan, index) in tujuanItems" :key="index" class="list-row bg-cream">
              <p>{{ tujuan }}</p>
            </div>
          </div>
        </div>
      </div>

        
    </section>

    <section class="section-content-wide bg-cream split-border-top">
      <div class="container grid-2 items-start">

        <div>
          <h2 class="block-side-title text-mint">Manfaat Prediksi Stres</h2>
          <p class="block-side-subtitle text-charcoal">Mengetahui tingkat stres lebih awal membawa dampak positif bagi kehidupan akademik dan personal.</p>
          <div class="progress-bars-stack">
            <div class="stack-list-vertical">
            <div v-for="(manfaat, index) in manfaatItems" :key="index" class="list-row bg-white">
              <p>{{ manfaat.label }}</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-content-wide bg-white">
      <div class="container">
        <h2 class="block-main-title text-mint">Target Pengguna</h2>
        <p class="block-main-subtitle text-charcoal">Platform ini dibuat untuk berbagai pihak yang terlibat dalam ekosistem pendidikan.</p>
        <div class="grid-4">
          <div v-for="(target, index) in targetPengguna" :key="index" class="card-target-box bg-cream">
            <p class="target-box-text text-charcoal">{{ target.title }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-cta-footer">
      <div class="container cta-inner-wrapper text-white">
        <h2>Siap Mengetahui Tingkat Stres Anda?</h2>
        <p>Isi form prediksi sederhana dan dapatkan analisis mendalam tentang kondisi mental Anda!</p>
        <router-link to="/prediksi" class="btn-cta-white text-mint">Mulai Prediksi Sekarang</router-link>
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
          <h4 class="text-white">Kontak</h4>
          <p>stresspredict@gmail.com</p>
        </div>
      </div>
    </footer>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;900&display=swap');

.halaman-beranda {
  font-family: 'Poppins', sans-serif;
  background-color: #FFFFFF;
}


.bg-cream { background-color: #FFF7DD; }
.bg-white { background-color: #FFFFFF; }
.bg-footer { background-color: #2C3A47; }
.bg-blue { background-color: #80A1BA; }
.bg-mint { background-color: #91C4C3; }
.bg-green { background-color: #B4DEBD; }

.text-white { color: #FFFFFF; }
.text-mint { color: #91C4C3; }
.text-soft-blue { color: #80A1BA; }
.text-charcoal { color: #6B7280; }
.text-muted-grey { color: #9CA3AF; }


.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; box-sizing: border-box; }
.section-content-wide { padding: 80px 0; }
.grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
.grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 56px; }
.grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
.items-start { align-items: start; }
.split-border-top { border-top: 1px solid #E5E7EB; }


.navbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; }
.nav-brand { font-weight: 700; font-size: 1.25rem; color: #FFFFFF; }
.nav-links { display: flex; align-items: center; gap: 24px; }
.nav-link { text-decoration: none; font-weight: 500; }
.nav-btn-active { background-color: #FFFFFF; padding: 6px 18px; border-radius: 9999px; text-decoration: none; font-weight: 600; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }


.main-header { background-color: #91C4C3; }
.hero-center { text-align: center; padding: 72px 0 96px 0; display: flex; flex-direction: column; align-items: center; }
.hero-center h1 { font-size: 2.75rem; font-weight: 800; margin: 0 0 16px 0; color: #FFFFFF; }
.hero-center p { font-size: 1.05rem; color: #FFFFFF; max-width: 48rem; margin: 0 0 40px 0; font-weight: 300; line-height: 1.6; }


.hero-actions-panel { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; }
.btn-hero-primary { padding: 14px 32px; border-radius: 9999px; font-weight: 600; text-decoration: none; background-color: rgba(255, 255, 255, 0.15); border: 1px solid rgba(255, 255, 255, 0.35); transition: 0.2s; }
.btn-hero-primary:hover { background-color: rgba(255, 255, 255, 0.25); }
.btn-hero-secondary { padding: 14px 32px; border-radius: 9999px; font-weight: 600; text-decoration: none; background-color: #FFFFFF; box-shadow: 0 4px 10px rgba(0,0,0,0.05); display: flex; align-items: center; gap: 8px; }
.cta-icon-svg { width: 16px; height: 16px; display: flex; align-items: center; }
.cta-icon-svg :deep(svg) { width: 100%; height: 100%; }


.card-stat-box { padding: 32px 24px; border-radius: 16px; text-align: center; border: 1px solid #F3F4F6; box-shadow: 0 2px 4px rgba(0,0,0,0.01); }
.stat-big-num { font-size: 2.25rem; font-weight: 800; margin-bottom: 6px; }
.stat-small-label { font-size: 0.875rem; font-weight: 500; }

.block-main-title { font-size: 2rem; font-weight: 800; text-align: center; margin: 0 0 12px 0; }
.block-main-subtitle { font-size: 1.05rem; text-align: center; margin: 0 0 48px 0; font-weight: 300; }
.block-side-title { font-size: 2rem; font-weight: 800; margin: 0 0 16px 0; }
.block-side-subtitle { font-size: 1.05rem; margin-bottom: 40px; line-height: 1.6; }

.card-feature-box { padding: 40px; border-radius: 16px; border: 1px solid #F3F4F6; box-shadow: 0 4px 20px rgba(0,0,0,0.02); display: flex; flex-direction: column; gap: 12px; }
.card-feature-box h3 { font-size: 1.35rem; font-weight: 700; color: #6B7280; margin: 0; }
.card-feature-box p { font-size: 0.95rem; font-weight: 300; line-height: 1.6; margin: 0; }


.stack-list-vertical { display: flex; flex-direction: column; gap: 16px; }
.list-row { padding: 20px 24px; border-radius: 16px; border: 1px solid #F3F4F6; }
.list-row p { margin: 0; font-size: 0.95rem; font-weight: 500; }


.graphic-flex-container { display: flex; flex-direction: column; align-items: center; width: 100%; }
.align-left { align-items: flex-start; }
.graphic-box-title { font-size: 1.5rem; font-weight: 800; margin: 0 0 8px 0; text-align: center; }
.graphic-box-subtitle { font-size: 0.95rem; margin-bottom: 24px; text-align: center; }

.donut-chart-svg-wrapper { width: 200px; height: 200px; position: relative; display: flex; align-items: center; justify-content: center; margin-bottom: 32px; }
.donut-vector { width: 100%; height: 100%; }
.donut-center-percentage { position: absolute; font-size: 2rem; font-weight: 900; }
.chart-labels-legend { display: flex; gap: 24px; font-size: 0.85rem; font-weight: 600; flex-wrap: wrap; justify-content: center; }
.chart-labels-legend div { display: flex; align-items: center; gap: 8px; }
.legend-circle { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }


.native-bar-chart-box { width: 100%; height: 200px; display: flex; align-items: flex-end; gap: 32px; padding-left: 48px; border-left: 2px solid #E5E7EB; border-bottom: 2px solid #E5E7EB; position: relative; margin-top: 24px; box-sizing: border-box; }
.chart-y-axis { position: absolute; left: -40px; top: 0; height: 100%; display: flex; flex-direction: column; justify-content: space-between; font-size: 0.75rem; font-weight: 500; }
.bar-column-wrapper { flex: 1; display: flex; flex-direction: column; align-items: center; }
.bar-fill-node { width: 100%; max-width: 56px; border-radius: 8px 8px 0 0; }
.bar-fill-text { font-size: 0.9rem; font-weight: 700; margin-top: 12px; }


.progress-bars-stack { display: flex; flex-direction: column; gap: 24px; }
.progress-row-item { display: flex; flex-direction: column; }
.progress-row-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.progress-row-header p { margin: 0; font-size: 0.95rem; font-weight: 500; }
.progress-row-val { font-size: 1.1rem; font-weight: 700; }
.progress-row-track { width: 100%; height: 12px; border-radius: 9999px; overflow: hidden; border: 1px solid #E5E7EB; }
.progress-row-fill { height: 100%; border-radius: 9999px; }


.card-target-box { padding: 32px 24px; text-align: center; border-radius: 16px; min-height: 120px; display: flex; align-items: center; justify-content: center; border: 1px solid #F3F4F6; }
.target-box-text { font-size: 0.95rem; font-weight: 600; margin: 0; line-height: 1.5; }


.section-cta-footer { background-color: #91C4C3; padding: 80px 0; text-align: center; }
.cta-inner-wrapper h2 { font-size: 2.25rem; font-weight: 800; margin: 0 0 16px 0; }
.cta-inner-wrapper p { font-size: 1.1rem; max-width: 44rem; margin: 0 auto 40px auto; font-weight: 300; opacity: 0.95; line-height: 1.6; }
.btn-cta-white { padding: 14px 40px; background-color: #FFFFFF; font-weight: 700; text-decoration: none; border-radius: 9999px; box-shadow: 0 10px 20px rgba(0,0,0,0.06); display: inline-block; }

.main-footer { padding: 80px 0; }
.footer-brand { font-size: 1.5rem; font-weight: 700; }
.footer-desc { font-weight: 300; margin-top: 16px; line-height: 1.6; }
.main-footer h4 { font-size: 1.125rem; font-weight: 600; margin: 0 0 24px 0; }
.footer-links-col { display: flex; flex-direction: column; gap: 12px; }
.footer-links-col a { text-decoration: underline; font-weight: 500; }
</style>