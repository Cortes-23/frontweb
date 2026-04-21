import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://backend2-rpin.onrender.com"
})

// 🔹 Interceptor de requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // 🔹 Manejo seguro del tenant
  const tenant = localStorage.getItem("tenant")

  if (tenant) {
    try {
      const { slug } = JSON.parse(tenant)
      if (slug) {
        config.headers["x-tenant-slug"] = slug
      }
    } catch (error) {
      console.error("❌ Error parsing tenant:", error)
    }
  }

  return config
})

export default api