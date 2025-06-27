import dayjs from 'dayjs';

export type CicoData = {
  id: number;
  student_id: number;
  room_id: number;
  subject_id: number;
  status: number;
  checkin_time: dayjs.Dayjs[]; // kiểu đã xử lý
  checkout_time: dayjs.Dayjs[];
  subject_name: string;
};
