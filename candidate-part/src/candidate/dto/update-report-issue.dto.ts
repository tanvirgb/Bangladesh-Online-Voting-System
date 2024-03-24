import { PartialType } from '@nestjs/mapped-types';
import { CreateReportIssueDto } from './create-report-issue.dto';

export class UpdateReportIssueDto extends PartialType(CreateReportIssueDto) {}
