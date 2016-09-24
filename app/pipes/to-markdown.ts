import {Pipe, PipeTransform} from 'angular2/core';
import * as Marked from 'marked';
@Pipe({ name: 'toMarkdown' })
export class ToMarkdownPipe implements PipeTransform {
  transform(text: string): string {
    return Marked(text, { gfm: true, breaks: false });
  }
}
