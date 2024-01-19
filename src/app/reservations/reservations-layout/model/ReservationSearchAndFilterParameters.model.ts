export interface ReservationSearchAndFilterParameters {
  name: string,
  startDate: Date | null,
  endDate: Date | null,
  statuses: string[],
}
