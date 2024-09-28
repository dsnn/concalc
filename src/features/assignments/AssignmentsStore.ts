import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { AssignmentType } from './AssignmentType'

export const useAssignmentsStore = defineStore('assignments', () => {
  const KEY = 'assignments'
  const item = localStorage.getItem(KEY)
  const data = item ? JSON.parse(item) : []
  const assignments = ref<AssignmentType[]>(data)

  watch(assignments, () => {
    const data = JSON.stringify(assignments.value)
    localStorage.setItem(KEY, data)
  })

  const add = (assignment: AssignmentType) => {
    assignments.value = [...assignments.value, assignment]
  }

  const remove = (id: number) => {
    assignments.value = assignments.value.filter((a) => a.id !== id)
  }

  const update = (assignment: AssignmentType) => {
    const foundIndex = assignments.value.findIndex((a) => a.id === assignment.id)
    assignments.value[foundIndex] = assignment
  }

  const findById = (id: number) => {
    return assignments.value.find((a) => a.id === id)
  }

  const getId = () => {
    const ids = assignments.value.map((a) => a.id!)
    return ids.length > 0 ? Math.max(...ids) + 1 : 0
  }

  return {
    assignments,
    add,
    remove,
    update,
    findById,
    getId
  }
})
