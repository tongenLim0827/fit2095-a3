import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: number, ...args: number[]): unknown {
    let transformedStr = '';
    let startingIndex = args[0];
    let stopIndex = args[1];
    const formatTime = (minutes: number) => {
      const hours = (minutes/60) - (minutes/60)%1
      const r_minutes = (minutes/60)%1 * 60
      return hours > 0 ? `${hours} hour(s) ${r_minutes} minute(s)` : `${r_minutes} minute(s)`
  }
    transformedStr = formatTime(value)
    return transformedStr;
  }

}
