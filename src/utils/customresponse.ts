import FutureStatus from "./FutureStatus";
interface CustomResponse<T> {
  status: FutureStatus;
  data?: T;
  error?: Error;
}
export default CustomResponse;
