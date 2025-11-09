// Import library yang kita butuhkan
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// === 1. SETUP DASAR ===

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // alpha:true untuk background transparan

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// === 2. GANTI MODEL 3D KAMU DI SINI ===

// Ganti 'simple_keris.glb' dengan path ke file model .glb atau .gltf kamu
const modelPath = 'simple_keris.glb'; 

const loader = new GLTFLoader();
loader.load(
  modelPath,
  function (gltf) {
    // Jika berhasil dimuat, tambahkan ke scene
    const object = gltf.scene;
    scene.add(object);
    console.log("✅ Model 3D berhasil dimuat!");
  },
  function (xhr) {
    // Opsi: tampilkan progress loading
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    // Jika gagal, tampilkan error di console
    console.error("❌ Gagal memuat model 3D:", error);
  }
);

// === 3. ATUR POSISI KAMERA & CAHAYA ===

// Atur seberapa jauh kamera dari model. Coba ubah angka '2' ini jika modelmu terlalu besar/kecil.
camera.position.z = 2;

// Tambahkan cahaya agar model tidak gelap
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (warna, intensitas)
topLight.position.set(500, 500, 500);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 1);
scene.add(ambientLight);

// === 4. TAMBAHKAN KONTROL ORBIT (PUTAR/ZOOM) ===

// Ini WAJIB ada agar kamu bisa memutar model dengan mouse/sentuhan
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Membuat gerakan lebih halus

// === 5. RENDER LOOP ===

function animate() {
  requestAnimationFrame(animate);

  // Update kontrol orbit di setiap frame
  controls.update(); 

  renderer.render(scene, camera);
}

// Listener agar scene menyesuaikan ukuran saat jendela browser diubah
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Mulai rendering
animate();