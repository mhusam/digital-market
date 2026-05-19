-- 100 predefined published products for storefront demos and QA pagination.

INSERT INTO catalog_products (id, title, slug, description, price, currency, status, created_at, updated_at)
SELECT gen_random_uuid(), 'Microsoft 365 Business Standard — Pack 001', 'predefined-product-001', 'Licensed digital IT product. Microsoft 365 Business Standard — instant download after payment. SKU PRED-0001.', 16.46, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Microsoft 365 E3 Enterprise — Pack 002', 'predefined-product-002', 'Licensed digital IT product. Microsoft 365 E3 Enterprise — instant download after payment. SKU PRED-0002.', 22.93, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Windows 11 Pro Retail License — Pack 003', 'predefined-product-003', 'Licensed digital IT product. Windows 11 Pro Retail License — instant download after payment. SKU PRED-0003.', 29.40, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Windows Server 2022 Standard — Pack 004', 'predefined-product-004', 'Licensed digital IT product. Windows Server 2022 Standard — instant download after payment. SKU PRED-0004.', 35.87, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Windows Server 2022 Datacenter — Pack 005', 'predefined-product-005', 'Licensed digital IT product. Windows Server 2022 Datacenter — instant download after payment. SKU PRED-0005.', 42.34, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'SQL Server 2022 Standard Core — Pack 006', 'predefined-product-006', 'Licensed digital IT product. SQL Server 2022 Standard Core — instant download after payment. SKU PRED-0006.', 48.81, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Visual Studio 2022 Professional — Pack 007', 'predefined-product-007', 'Licensed digital IT product. Visual Studio 2022 Professional — instant download after payment. SKU PRED-0007.', 40.58, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Visual Studio 2022 Enterprise — Pack 008', 'predefined-product-008', 'Licensed digital IT product. Visual Studio 2022 Enterprise — instant download after payment. SKU PRED-0008.', 47.05, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'JetBrains All Products Pack — Pack 009', 'predefined-product-009', 'Licensed digital IT product. JetBrains All Products Pack — instant download after payment. SKU PRED-0009.', 53.52, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'IntelliJ IDEA Ultimate — Pack 010', 'predefined-product-010', 'Licensed digital IT product. IntelliJ IDEA Ultimate — instant download after payment. SKU PRED-0010.', 59.99, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'PyCharm Professional — Pack 011', 'predefined-product-011', 'Licensed digital IT product. PyCharm Professional — instant download after payment. SKU PRED-0011.', 66.46, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'WebStorm Commercial — Pack 012', 'predefined-product-012', 'Licensed digital IT product. WebStorm Commercial — instant download after payment. SKU PRED-0012.', 72.93, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Docker Business Subscription — Pack 013', 'predefined-product-013', 'Licensed digital IT product. Docker Business Subscription — instant download after payment. SKU PRED-0013.', 79.40, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'GitLab Ultimate Seat — Pack 014', 'predefined-product-014', 'Licensed digital IT product. GitLab Ultimate Seat — instant download after payment. SKU PRED-0014.', 71.17, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'GitHub Enterprise Cloud Add-on — Pack 015', 'predefined-product-015', 'Licensed digital IT product. GitHub Enterprise Cloud Add-on — instant download after payment. SKU PRED-0015.', 77.64, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Atlassian Jira Software Cloud — Pack 016', 'predefined-product-016', 'Licensed digital IT product. Atlassian Jira Software Cloud — instant download after payment. SKU PRED-0016.', 84.11, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Confluence Premium Cloud — Pack 017', 'predefined-product-017', 'Licensed digital IT product. Confluence Premium Cloud — instant download after payment. SKU PRED-0017.', 90.58, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Slack Business+ (Annual) — Pack 018', 'predefined-product-018', 'Licensed digital IT product. Slack Business+ (Annual) — instant download after payment. SKU PRED-0018.', 97.05, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Zoom Pro Annual License — Pack 019', 'predefined-product-019', 'Licensed digital IT product. Zoom Pro Annual License — instant download after payment. SKU PRED-0019.', 103.52, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Adobe Creative Cloud All Apps — Pack 020', 'predefined-product-020', 'Licensed digital IT product. Adobe Creative Cloud All Apps — instant download after payment. SKU PRED-0020.', 109.99, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Figma Professional Organization — Pack 021', 'predefined-product-021', 'Licensed digital IT product. Figma Professional Organization — instant download after payment. SKU PRED-0021.', 101.76, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Sketch Business License — Pack 022', 'predefined-product-022', 'Licensed digital IT product. Sketch Business License — instant download after payment. SKU PRED-0022.', 108.23, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), '1Password Teams Starter — Pack 023', 'predefined-product-023', 'Licensed digital IT product. 1Password Teams Starter — instant download after payment. SKU PRED-0023.', 114.70, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'NordVPN Business (10 seats) — Pack 024', 'predefined-product-024', 'Licensed digital IT product. NordVPN Business (10 seats) — instant download after payment. SKU PRED-0024.', 121.17, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Malwarebytes Endpoint Protection — Pack 025', 'predefined-product-025', 'Licensed digital IT product. Malwarebytes Endpoint Protection — instant download after payment. SKU PRED-0025.', 127.64, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Acronis Cyber Backup Advanced — Pack 026', 'predefined-product-026', 'Licensed digital IT product. Acronis Cyber Backup Advanced — instant download after payment. SKU PRED-0026.', 134.11, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Veeam Backup & Replication Universal — Pack 027', 'predefined-product-027', 'Licensed digital IT product. Veeam Backup & Replication Universal — instant download after payment. SKU PRED-0027.', 140.58, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'VMware vSphere Standard — Pack 028', 'predefined-product-028', 'Licensed digital IT product. VMware vSphere Standard — instant download after payment. SKU PRED-0028.', 132.35, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Red Hat Enterprise Linux Server — Pack 029', 'predefined-product-029', 'Licensed digital IT product. Red Hat Enterprise Linux Server — instant download after payment. SKU PRED-0029.', 138.82, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'SUSE Linux Enterprise Server — Pack 030', 'predefined-product-030', 'Licensed digital IT product. SUSE Linux Enterprise Server — instant download after payment. SKU PRED-0030.', 145.29, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Ansible Automation Platform — Pack 031', 'predefined-product-031', 'Licensed digital IT product. Ansible Automation Platform — instant download after payment. SKU PRED-0031.', 151.76, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Terraform Cloud Team — Pack 032', 'predefined-product-032', 'Licensed digital IT product. Terraform Cloud Team — instant download after payment. SKU PRED-0032.', 158.23, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Kubernetes Support Subscription — Pack 033', 'predefined-product-033', 'Licensed digital IT product. Kubernetes Support Subscription — instant download after payment. SKU PRED-0033.', 164.70, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'AWS Business Support Credits — Pack 034', 'predefined-product-034', 'Licensed digital IT product. AWS Business Support Credits — instant download after payment. SKU PRED-0034.', 171.17, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Azure DevOps Basic + Test Plans — Pack 035', 'predefined-product-035', 'Licensed digital IT product. Azure DevOps Basic + Test Plans — instant download after payment. SKU PRED-0035.', 162.94, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Google Workspace Business Plus — Pack 036', 'predefined-product-036', 'Licensed digital IT product. Google Workspace Business Plus — instant download after payment. SKU PRED-0036.', 169.41, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Cloudflare Zero Trust Seat — Pack 037', 'predefined-product-037', 'Licensed digital IT product. Cloudflare Zero Trust Seat — instant download after payment. SKU PRED-0037.', 175.88, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Okta Workforce Identity — Pack 038', 'predefined-product-038', 'Licensed digital IT product. Okta Workforce Identity — instant download after payment. SKU PRED-0038.', 182.35, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Auth0 Enterprise Connections — Pack 039', 'predefined-product-039', 'Licensed digital IT product. Auth0 Enterprise Connections — instant download after payment. SKU PRED-0039.', 188.82, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Datadog Pro Infrastructure — Pack 040', 'predefined-product-040', 'Licensed digital IT product. Datadog Pro Infrastructure — instant download after payment. SKU PRED-0040.', 195.29, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'New Relic Full Platform — Pack 041', 'predefined-product-041', 'Licensed digital IT product. New Relic Full Platform — instant download after payment. SKU PRED-0041.', 201.76, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Splunk Cloud Credits Pack — Pack 042', 'predefined-product-042', 'Licensed digital IT product. Splunk Cloud Credits Pack — instant download after payment. SKU PRED-0042.', 193.53, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Elastic Cloud Enterprise — Pack 043', 'predefined-product-043', 'Licensed digital IT product. Elastic Cloud Enterprise — instant download after payment. SKU PRED-0043.', 12.09, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'MongoDB Atlas M10 Credits — Pack 044', 'predefined-product-044', 'Licensed digital IT product. MongoDB Atlas M10 Credits — instant download after payment. SKU PRED-0044.', 18.56, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'PostgreSQL Enterprise Support — Pack 045', 'predefined-product-045', 'Licensed digital IT product. PostgreSQL Enterprise Support — instant download after payment. SKU PRED-0045.', 25.03, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Redis Enterprise Cloud 1GB — Pack 046', 'predefined-product-046', 'Licensed digital IT product. Redis Enterprise Cloud 1GB — instant download after payment. SKU PRED-0046.', 31.50, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Kafka Confluent Cloud Cluster — Pack 047', 'predefined-product-047', 'Licensed digital IT product. Kafka Confluent Cloud Cluster — instant download after payment. SKU PRED-0047.', 37.97, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Nginx Plus Controller — Pack 048', 'predefined-product-048', 'Licensed digital IT product. Nginx Plus Controller — instant download after payment. SKU PRED-0048.', 44.44, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'HAProxy Enterprise Support — Pack 049', 'predefined-product-049', 'Licensed digital IT product. HAProxy Enterprise Support — instant download after payment. SKU PRED-0049.', 36.21, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Citrix Virtual Apps and Desktops — Pack 050', 'predefined-product-050', 'Licensed digital IT product. Citrix Virtual Apps and Desktops — instant download after payment. SKU PRED-0050.', 42.68, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Microsoft 365 Business Standard — Pack 051', 'predefined-product-051', 'Licensed digital IT product. Microsoft 365 Business Standard — instant download after payment. SKU PRED-0051.', 49.15, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Microsoft 365 E3 Enterprise — Pack 052', 'predefined-product-052', 'Licensed digital IT product. Microsoft 365 E3 Enterprise — instant download after payment. SKU PRED-0052.', 55.62, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Windows 11 Pro Retail License — Pack 053', 'predefined-product-053', 'Licensed digital IT product. Windows 11 Pro Retail License — instant download after payment. SKU PRED-0053.', 62.09, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Windows Server 2022 Standard — Pack 054', 'predefined-product-054', 'Licensed digital IT product. Windows Server 2022 Standard — instant download after payment. SKU PRED-0054.', 68.56, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Windows Server 2022 Datacenter — Pack 055', 'predefined-product-055', 'Licensed digital IT product. Windows Server 2022 Datacenter — instant download after payment. SKU PRED-0055.', 75.03, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'SQL Server 2022 Standard Core — Pack 056', 'predefined-product-056', 'Licensed digital IT product. SQL Server 2022 Standard Core — instant download after payment. SKU PRED-0056.', 66.80, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Visual Studio 2022 Professional — Pack 057', 'predefined-product-057', 'Licensed digital IT product. Visual Studio 2022 Professional — instant download after payment. SKU PRED-0057.', 73.27, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Visual Studio 2022 Enterprise — Pack 058', 'predefined-product-058', 'Licensed digital IT product. Visual Studio 2022 Enterprise — instant download after payment. SKU PRED-0058.', 79.74, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'JetBrains All Products Pack — Pack 059', 'predefined-product-059', 'Licensed digital IT product. JetBrains All Products Pack — instant download after payment. SKU PRED-0059.', 86.21, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'IntelliJ IDEA Ultimate — Pack 060', 'predefined-product-060', 'Licensed digital IT product. IntelliJ IDEA Ultimate — instant download after payment. SKU PRED-0060.', 92.68, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'PyCharm Professional — Pack 061', 'predefined-product-061', 'Licensed digital IT product. PyCharm Professional — instant download after payment. SKU PRED-0061.', 99.15, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'WebStorm Commercial — Pack 062', 'predefined-product-062', 'Licensed digital IT product. WebStorm Commercial — instant download after payment. SKU PRED-0062.', 105.62, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Docker Business Subscription — Pack 063', 'predefined-product-063', 'Licensed digital IT product. Docker Business Subscription — instant download after payment. SKU PRED-0063.', 97.39, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'GitLab Ultimate Seat — Pack 064', 'predefined-product-064', 'Licensed digital IT product. GitLab Ultimate Seat — instant download after payment. SKU PRED-0064.', 103.86, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'GitHub Enterprise Cloud Add-on — Pack 065', 'predefined-product-065', 'Licensed digital IT product. GitHub Enterprise Cloud Add-on — instant download after payment. SKU PRED-0065.', 110.33, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Atlassian Jira Software Cloud — Pack 066', 'predefined-product-066', 'Licensed digital IT product. Atlassian Jira Software Cloud — instant download after payment. SKU PRED-0066.', 116.80, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Confluence Premium Cloud — Pack 067', 'predefined-product-067', 'Licensed digital IT product. Confluence Premium Cloud — instant download after payment. SKU PRED-0067.', 123.27, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Slack Business+ (Annual) — Pack 068', 'predefined-product-068', 'Licensed digital IT product. Slack Business+ (Annual) — instant download after payment. SKU PRED-0068.', 129.74, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Zoom Pro Annual License — Pack 069', 'predefined-product-069', 'Licensed digital IT product. Zoom Pro Annual License — instant download after payment. SKU PRED-0069.', 136.21, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Adobe Creative Cloud All Apps — Pack 070', 'predefined-product-070', 'Licensed digital IT product. Adobe Creative Cloud All Apps — instant download after payment. SKU PRED-0070.', 127.98, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Figma Professional Organization — Pack 071', 'predefined-product-071', 'Licensed digital IT product. Figma Professional Organization — instant download after payment. SKU PRED-0071.', 134.45, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Sketch Business License — Pack 072', 'predefined-product-072', 'Licensed digital IT product. Sketch Business License — instant download after payment. SKU PRED-0072.', 140.92, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), '1Password Teams Starter — Pack 073', 'predefined-product-073', 'Licensed digital IT product. 1Password Teams Starter — instant download after payment. SKU PRED-0073.', 147.39, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'NordVPN Business (10 seats) — Pack 074', 'predefined-product-074', 'Licensed digital IT product. NordVPN Business (10 seats) — instant download after payment. SKU PRED-0074.', 153.86, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Malwarebytes Endpoint Protection — Pack 075', 'predefined-product-075', 'Licensed digital IT product. Malwarebytes Endpoint Protection — instant download after payment. SKU PRED-0075.', 160.33, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Acronis Cyber Backup Advanced — Pack 076', 'predefined-product-076', 'Licensed digital IT product. Acronis Cyber Backup Advanced — instant download after payment. SKU PRED-0076.', 166.80, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Veeam Backup & Replication Universal — Pack 077', 'predefined-product-077', 'Licensed digital IT product. Veeam Backup & Replication Universal — instant download after payment. SKU PRED-0077.', 158.57, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'VMware vSphere Standard — Pack 078', 'predefined-product-078', 'Licensed digital IT product. VMware vSphere Standard — instant download after payment. SKU PRED-0078.', 165.04, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Red Hat Enterprise Linux Server — Pack 079', 'predefined-product-079', 'Licensed digital IT product. Red Hat Enterprise Linux Server — instant download after payment. SKU PRED-0079.', 171.51, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'SUSE Linux Enterprise Server — Pack 080', 'predefined-product-080', 'Licensed digital IT product. SUSE Linux Enterprise Server — instant download after payment. SKU PRED-0080.', 177.98, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Ansible Automation Platform — Pack 081', 'predefined-product-081', 'Licensed digital IT product. Ansible Automation Platform — instant download after payment. SKU PRED-0081.', 184.45, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Terraform Cloud Team — Pack 082', 'predefined-product-082', 'Licensed digital IT product. Terraform Cloud Team — instant download after payment. SKU PRED-0082.', 190.92, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Kubernetes Support Subscription — Pack 083', 'predefined-product-083', 'Licensed digital IT product. Kubernetes Support Subscription — instant download after payment. SKU PRED-0083.', 197.39, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'AWS Business Support Credits — Pack 084', 'predefined-product-084', 'Licensed digital IT product. AWS Business Support Credits — instant download after payment. SKU PRED-0084.', 189.16, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Azure DevOps Basic + Test Plans — Pack 085', 'predefined-product-085', 'Licensed digital IT product. Azure DevOps Basic + Test Plans — instant download after payment. SKU PRED-0085.', 195.63, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Google Workspace Business Plus — Pack 086', 'predefined-product-086', 'Licensed digital IT product. Google Workspace Business Plus — instant download after payment. SKU PRED-0086.', 14.19, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Cloudflare Zero Trust Seat — Pack 087', 'predefined-product-087', 'Licensed digital IT product. Cloudflare Zero Trust Seat — instant download after payment. SKU PRED-0087.', 20.66, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Okta Workforce Identity — Pack 088', 'predefined-product-088', 'Licensed digital IT product. Okta Workforce Identity — instant download after payment. SKU PRED-0088.', 27.13, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Auth0 Enterprise Connections — Pack 089', 'predefined-product-089', 'Licensed digital IT product. Auth0 Enterprise Connections — instant download after payment. SKU PRED-0089.', 33.60, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Datadog Pro Infrastructure — Pack 090', 'predefined-product-090', 'Licensed digital IT product. Datadog Pro Infrastructure — instant download after payment. SKU PRED-0090.', 40.07, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'New Relic Full Platform — Pack 091', 'predefined-product-091', 'Licensed digital IT product. New Relic Full Platform — instant download after payment. SKU PRED-0091.', 31.84, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Splunk Cloud Credits Pack — Pack 092', 'predefined-product-092', 'Licensed digital IT product. Splunk Cloud Credits Pack — instant download after payment. SKU PRED-0092.', 38.31, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Elastic Cloud Enterprise — Pack 093', 'predefined-product-093', 'Licensed digital IT product. Elastic Cloud Enterprise — instant download after payment. SKU PRED-0093.', 44.78, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'MongoDB Atlas M10 Credits — Pack 094', 'predefined-product-094', 'Licensed digital IT product. MongoDB Atlas M10 Credits — instant download after payment. SKU PRED-0094.', 51.25, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'PostgreSQL Enterprise Support — Pack 095', 'predefined-product-095', 'Licensed digital IT product. PostgreSQL Enterprise Support — instant download after payment. SKU PRED-0095.', 57.72, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Redis Enterprise Cloud 1GB — Pack 096', 'predefined-product-096', 'Licensed digital IT product. Redis Enterprise Cloud 1GB — instant download after payment. SKU PRED-0096.', 64.19, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Kafka Confluent Cloud Cluster — Pack 097', 'predefined-product-097', 'Licensed digital IT product. Kafka Confluent Cloud Cluster — instant download after payment. SKU PRED-0097.', 70.66, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Nginx Plus Controller — Pack 098', 'predefined-product-098', 'Licensed digital IT product. Nginx Plus Controller — instant download after payment. SKU PRED-0098.', 62.43, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'HAProxy Enterprise Support — Pack 099', 'predefined-product-099', 'Licensed digital IT product. HAProxy Enterprise Support — instant download after payment. SKU PRED-0099.', 68.90, 'USD', 'PUBLISHED', now(), now()
UNION ALL
SELECT gen_random_uuid(), 'Citrix Virtual Apps and Desktops — Pack 100', 'predefined-product-100', 'Licensed digital IT product. Citrix Virtual Apps and Desktops — instant download after payment. SKU PRED-0100.', 75.37, 'USD', 'PUBLISHED', now(), now();
