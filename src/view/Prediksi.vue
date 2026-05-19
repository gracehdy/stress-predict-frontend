<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 1. Variabel penampung data formulir kuesioner
const formData = ref({
  umur: '', gender: '', tahunAkademik: '',
  jamBelajar: '', tekananUjian: '', ipk: '', ekspektasiKeluarga: '',
  anxietyScore: '', depressionScore: '', jamTidur: '', aktivitasFisik: '', screenTime: '',
  internetUsage: '', socialSupport: '', financialStress: '',
  burnoutScore: '', mentalHealthIndex: '' 
})

// 🟢 PERBAIKAN 1: Deklarasikan variabel hasil prediksi agar tidak memicu crash JavaScript
const predictionResult = ref(null)
const loading = ref(false)

const validasiInput = (fitur, min, max) => {
  let nilai = formData.value[fitur];
  if (nilai === '' || nilai === null || nilai === undefined) return;
  
  let angka = parseFloat(nilai);
  if (isNaN(angka)) return;

  if (fitur === 'ipk') {
    if (angka < 1.0) formData.value[fitur] = 1.0;
    if (angka > 4.0) formData.value[fitur] = 4.0;
    return;
  }

  if (angka < min) formData.value[fitur] = min;
  if (angka > max) formData.value[fitur] = max;
}

const handleAnalyze = async () => {

  if (!formData.value.umur || !formData.value.gender || !formData.value.tahunAkademik) {
    alert('Mohon lengkapi data kuesioner Anda untuk dianalisis!')
    return
  }

  const urlHf = "https://gracehdyc-stress-predict-api.hf.space" 
  
  loading.value = true
  
  try {

    const response = await fetch(`${urlHf}/api/predict`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData.value) 
    })
    
    if (!response.ok) throw new Error(`Server Error dengan status: ${response.status}`)
    
    const result = await response.json()
    predictionResult.value = result 
    router.push({
      path: '/hasil-prediksi',
      state: { dataPrediksi: result }
    })

  } catch (error) {
    console.error("Gagal terkoneksi ke Hugging Face FastAPI:", error)
    alert("Gagal terhubung ke server prediksi AI. Pastikan Space Hugging Face kamu berstatus 'Running'.")
  } finally {
    loading.value = false
  }
}


const IkonPetir = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
</script>

<template>
  <div class="halaman-prediksi min-h-screen text-charcoal bg-white">
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
        <h1>Prediksi Tingkat Stress</h1>
        <p>Isi formulir berikut untuk mendapatkan analisis stres berbasis machine learning</p>
      </div>
    </header>

    <section class="section-form bg-cream">
      <div class="container max-w-form">
        <div class="card card-form-body bg-white">
          
          <div class="form-group-section">
            <h3 class="section-form-title border-blue text-soft-blue">1. Informasi Dasar</h3>
            <div class="grid-3">
              <div class="input-block">
                <label>Umur</label>
                <div class="scale-label text-muted-grey"><span>Rentang: 15 - 50 tahun</span></div>
                <input v-model.number="formData.umur" type="number" min="15" max="50" autocomplete="off" @blur="validasiInput('umur', 15, 50)" placeholder="Contoh: 21" />
              </div>
              <div class="input-block">
                <label>Gender</label>
                <div class="scale-label text-muted-grey"><span>Pilih salah satu</span></div>
                <select v-model="formData.gender">
                  <option value="" disabled selected>Pilih Gender</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              <div class="input-block">
                <label>Tahun Academic</label>
                <div class="scale-label text-muted-grey"><span>Tingkat angkatan kuliah</span></div>
                <select v-model="formData.tahunAkademik">
                  <option value="" disabled selected>Pilih Tahun Akademik</option>
                  <option value="Tahun 1">Tahun 1</option>
                  <option value="Tahun 2">Tahun 2</option>
                  <option value="Tahun 3">Tahun 3</option>
                  <option value="Tahun 4">Tahun 4</option>
                </select>
              </div>
            </div>
          </div>

          <div class="form-group-section">
            <h3 class="section-form-title border-mint text-mint">2. Aktivitas Akademik</h3>
            <div class="grid-2">
              <div class="input-block">
                <label>Jam Belajar per Hari</label>
                <div class="scale-label text-muted-grey"><span>0</span><span>24 jam</span></div>
                <input v-model.number="formData.jamBelajar" type="number" min="0" max="24" autocomplete="off" @blur="validasiInput('jamBelajar', 0, 24)" placeholder="Jam" />
              </div>
              <div class="input-block">
                <label>Tekanan Ujian</label>
                <div class="scale-label text-muted-grey"><span>1 = sangat rendah, 10 = sangat tinggi</span></div>
                <input v-model.number="formData.tekananUjian" type="number" min="1" max="10" autocomplete="off" @blur="validasiInput('tekananUjian', 1, 10)" placeholder="Skala 1-10" />
              </div>
              <div class="input-block">
                <label>Performa Akademik (IPK)</label>
                <div class="scale-label text-muted-grey"><span>Skala: 1.00</span><span>4.00</span></div>
                <input v-model.number="formData.ipk" type="number" min="1.0" max="4.0" step="0.01" autocomplete="off" @blur="validasiInput('ipk', 1.0, 4.0)" placeholder="Contoh: 3.5" />
              </div>
              <div class="input-block">
                <label>Ekspektasi Keluarga</label>
                <div class="scale-label text-muted-grey"><span>1 = rendah, 10 = sangat tinggi</span></div>
                <input v-model.number="formData.ekspektasiKeluarga" type="number" min="1" max="10" autocomplete="off" @blur="validasiInput('ekspektasiKeluarga', 1, 10)" placeholder="Skala 1-10" />
              </div>
            </div>
          </div>

          <div class="form-group-section">
            <h3 class="section-form-title border-green text-soft-green">3. Mental & Lifestyle</h3>
            <div class="grid-2">
              <div class="input-block">
                <label>Anxiety Score</label>
                <div class="scale-label text-muted-grey"><span>1 = tidak cemas, 10 = sangat cemas</span></div>
                <input v-model.number="formData.anxietyScore" type="number" min="1" max="10" autocomplete="off" @blur="validasiInput('anxietyScore', 1, 10)" placeholder="Skala 1-10" />
              </div>
              <div class="input-block">
                <label>Depression Score</label>
                <div class="scale-label text-muted-grey"><span>1 = tidak depresi, 10 = sangat depresi</span></div>
                <input v-model.number="formData.depressionScore" type="number" min="1" max="10" autocomplete="off" @blur="validasiInput('depressionScore', 1, 10)" placeholder="Skala 1-10" />
              </div>
              <div class="input-block">
                <label>Jam Tidur per Malam</label>
                <div class="scale-label text-muted-grey"><span>0</span><span>24 jam</span></div>
                <input v-model.number="formData.jamTidur" type="number" min="0" max="24" autocomplete="off" @blur="validasiInput('jamTidur', 0, 24)" placeholder="Jam" />
              </div>
              <div class="input-block">
                <label>Aktivitas Fisik per Minggu</label>
                <div class="scale-label text-muted-grey"><span>0</span><span>7 hari aktif</span></div>
                <input v-model.number="formData.aktivitasFisik" type="number" min="0" max="7" autocomplete="off" @blur="validasiInput('aktivitasFisik', 0, 7)" placeholder="Hari aktif" />
              </div>
              <div class="input-block">
                <label>Screen Time per Hari</label>
                <div class="scale-label text-muted-grey"><span>0</span><span>24 jam</span></div>
                <input v-model.number="formData.screenTime" type="number" min="0" max="24" autocomplete="off" @blur="validasiInput('screenTime', 0, 24)" placeholder="Jam di depan layar" />
              </div>
              <div class="input-block">
                <label>Penggunaan Internet Umum per Hari</label>
                <div class="scale-label text-muted-grey"><span>0</span><span>24 jam</span></div>
                <input v-model.number="formData.internetUsage" type="number" min="0" max="24" autocomplete="off" @blur="validasiInput('internetUsage', 0, 24)" placeholder="Jam berselancar internet" />
              </div>
            </div>
          </div>

          <div class="form-group-section">
            <h3 class="section-form-title border-purple text-soft-purple">4. Sosial & Finansial + Indeks Khusus</h3>
            <div class="grid-2">
              <div class="input-block">
                <label>Social Support</label>
                <div class="scale-label text-muted-grey"><span>1 = tidak ada dukungan, 10 = dukungan penuh</span></div>
                <input v-model.number="formData.socialSupport" type="number" min="1" max="10" autocomplete="off" @blur="validasiInput('socialSupport', 1, 10)" placeholder="Skala 1-10" />
              </div>
              <div class="input-block">
                <label>Financial Stress</label>
                <div class="scale-label text-muted-grey"><span>1 = tidak ada tekanan, 10 = tekanan ekstrem</span></div>
                <input v-model.number="formData.financialStress" type="number" min="1" max="10" autocomplete="off" @blur="validasiInput('financialStress', 1, 10)" placeholder="Skala 1-10" />
              </div>
              <div class="input-block">
                <label>Burnout Score / Skor Kelelahan</label>
                <div class="scale-label text-muted-grey"><span>1 = sangat bugar, 10 = lelah ekstrem (burnout)</span></div>
                <input v-model.number="formData.burnoutScore" type="number" min="1" max="10" autocomplete="off" @blur="validasiInput('burnoutScore', 1, 10)" placeholder="Skala 1-10" />
              </div>
              <div class="input-block">
                <label>Mental Health Index</label>
                <div class="scale-label text-muted-grey"><span>1 = sangat buruk, 10 = sangat sehat / stabil</span></div>
                <input v-model.number="formData.mentalHealthIndex" type="number" min="1" max="10" autocomplete="off" @blur="validasiInput('mentalHealthIndex', 1, 10)" placeholder="Skala 1-10" />
              </div>
            </div>
          </div>

        </div>

        <div class="action-submit">
          <button @click="handleAnalyze" class="btn-submit">
            <div class="submit-icon" v-html="IkonPetir"></div> Analyze My Stress Level
          </button>
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
          <h4 class="text-white">Kontak</h4>
          <p>stresspredict@university.ac.id</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
.halaman-prediksi { font-family: 'Poppins', sans-serif; }
input:focus, select:focus { box-shadow: 0 0 0 3px rgba(145, 196, 195, 0.3); }

.main-header { background-color: #91C4C3; }
.bg-cream { background-color: #FFF7DD; }
.bg-white { background-color: #FFFFFF; }
.bg-footer { background-color: #2C3A47; }
.text-white { color: #FFFFFF; }
.text-mint { color: #91C4C3; }
.text-soft-blue { color: #80A1BA; }
.text-charcoal { color: #6B7280; }
.text-muted-grey { color: #9CA3AF; }
.text-soft-green { color: #87b390; }
.text-soft-purple { color: #8B8EAD; }

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; box-sizing: border-box; }
.max-w-form { max-width: 896px; }
.grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
.grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px; }
.full-width { grid-column: 1 / -1; }

.navbar { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; }
.nav-brand { font-weight: 700; font-size: 1.25rem; color: #FFFFFF; }
.nav-links { display: flex; align-items: center; gap: 24px; }
.nav-link { text-decoration: none; font-weight: 500; }
.nav-btn-active { background-color: #FFFFFF; padding: 6px 18px; border-radius: 9999px; text-decoration: none; font-weight: 600; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }

.hero-center { text-align: center; padding: 56px 0 64px 0; display: flex; flex-direction: column; align-items: center; }
.hero-center h1 { font-size: 2.5rem; font-weight: 800; margin: 0 0 16px 0; }
.hero-center p { font-size: 1rem; color: #FFFFFF; font-weight: 300; margin: 0; }

.section-form { padding: 64px 0; }
.card-form-body { padding: 48px; border-radius: 24px; border: 1px solid #F3F4F6; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 48px; }
.form-group-section { display: flex; flex-direction: column; gap: 24px; }
.section-form-title { font-size: 1.125rem; font-weight: 700; margin: 0; padding-bottom: 12px; border-bottom: 2px solid #E5E7EB; }

.input-block { display: flex; flex-direction: column; gap: 6px; position: relative; }
.input-block label { font-size: 0.85rem; font-weight: 700; color: #4B5563; margin-bottom: 0; }
.scale-label { display: flex; justify-content: space-between; font-size: 11px; font-weight: 500; padding: 0 2px; margin-bottom: 2px; }

input, select { width: 100%; background-color: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px; padding: 12px 16px; font-size: 0.875rem; color: #6B7280; box-sizing: border-box; transition: 0.2s; }

.action-submit { margin-top: 40px; display: flex; justify-content: center; }
.btn-submit { padding: 16px 40px; background-color: #80A1BA; color: #FFFFFF; border: none; border-radius: 9999px; font-size: 1rem; font-weight: 700; display: flex; align-items: center; gap: 12px; box-shadow: 0 10px 15px -3px rgba(128, 161, 186, 0.3); transition: 0.2s; cursor: pointer; }
.btn-submit:hover { background-color: #7192aa; transform: translateY(-1px); }
.submit-icon { width: 20px; height: 20px; display: flex; align-items: center; }
.submit-icon :deep(svg) { width: 100%; height: 100%; }

.main-footer { padding: 80px 0; }
.footer-brand { font-size: 1.5rem; font-weight: 700; }
.footer-desc { font-weight: 300; margin-top: 16px; line-height: 1.6; }
.main-footer h4 { font-size: 1.125rem; font-weight: 600; margin: 0 0 24px 0; }
.footer-links-col { display: flex; flex-direction: column; gap: 12px; }

/* Menghilangkan spin button panah naik turun */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>