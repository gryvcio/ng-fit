import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-section',
  templateUrl: './header-section.component.html',
  styleUrls: ['./header-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderSectionComponent {
  @Input() title: string;
  @Input() icon: string;
  @Input() color: string;
}
