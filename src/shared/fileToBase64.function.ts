import { Observable, ReplaySubject } from "rxjs";

export function fileToBase64(file: File): Observable<string> {
  const result = new ReplaySubject<string>(1);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => result.next(
    event.target?.result?.toString()!
  );
  return result;
}
