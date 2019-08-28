export const LOGIN_TOKEN = 'login-token'
export const COMMIT_TOKEN = 'commit-token'

function isEmptyObject(e) {
  let t

  for (t in e) {
    return !1
  }

  return !0
}

// LocalStorage
export function setVariant(k, v) {
  if (!isEmptyObject(k)) {
    window.localStorage.setItem(k, JSON.stringify(v))
  }
}

export function removeVariant(k) {
  window.localStorage.removeItem(k)
}

export function getVariant(k) {
  if (hasVariant(k)) {
    return JSON.parse(window.localStorage.getItem(k))
  } else {
    return null
  }
}

export function hasVariant(k) {
  let result = window.localStorage.getItem(k)

  return !isEmptyObject(result)
}

// SessionStorage
export function setVariantSession(k, v) {
  if (!isEmptyObject(k)) {
    window.sessionStorage.setItem(k, JSON.stringify(v))
  }
}

export function removeVariantSession(k) {
  window.sessionStorage.removeItem(k)
}

export function getVariantSession(k) {
  if (hasVariantSession(k)) {
    return JSON.parse(window.sessionStorage.getItem(k))
  } else {
    return null
  }
}

export function hasVariantSession(k) {
  let result = window.sessionStorage.getItem(k)

  return !isEmptyObject(result)
}
