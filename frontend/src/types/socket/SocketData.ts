export interface SocketData {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listener: (...args: any[]) => void;
}
