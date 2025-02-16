import toast from '@/helpers/toast'

export default ({ store, redirect }) => {
  // If the user is not authenticated
  if (!store.getters.isLoggedIn) {
    toast.error('Please log in first')
    return redirect('/admin')
  }
}
