export interface Tutor {
    id: string,
    email: string,
    name: string,
    availability: "full-time" | "part-time",
    comment?: string
}