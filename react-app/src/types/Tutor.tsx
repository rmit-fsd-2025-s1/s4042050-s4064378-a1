export interface Tutor {
    id: string,
    email: string,
    name: string,
    availability: "full-time" | "part-time",
    course: string,
    skills: string[],
    credentials: string,
    comment?: string,
    selected?: boolean
    rank?: number
}