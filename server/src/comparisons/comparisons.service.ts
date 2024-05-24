import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { RepositoriesService } from "src/repositories/repositories.service";
import { Dolos } from "src/dolos";
import { FileString } from "../types";

@Injectable()
export class ComparisonsService {

  constructor(private user: UsersService, private repository: RepositoriesService) { }

  async compareRepositories() {
    //const repository1 = await this.repository.getRepositoryContent(id1, username);
    //const repository2 = await this.repository.getRepositoryContent(id2, username);

    //const files1 = repository1.content.map(item => item.path);
    //const files2 = repository2.content.map(item => item.path);

    const files: FileString[] = [
      {
        "path": "src/main/java/cl/tingeso/mueblesstgo/MueblesstgoApplication.java",
        "content": "package cl.tingeso.mueblesstgo;\n\nimport org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\n\n@SpringBootApplication\npublic class MueblesstgoApplication {\n\n\tpublic static void main(String[] args) {\n\t\tSpringApplication.run(MueblesstgoApplication.class, args);\n\t}\n\n}\n"
      },
      {
        "path": "src/main/java/cl/tingeso/mueblesstgo/controllers/ApprovalController.java",
        "content": "package cl.tingeso.mueblesstgo.controllers;\n\nimport cl.tingeso.mueblesstgo.entities.ApprovalEntity;\nimport cl.tingeso.mueblesstgo.services.ApprovalService;\nimport org.springframework.stereotype.Controller;\nimport org.springframework.ui.Model;\nimport org.springframework.web.bind.annotation.*;\n\n@Controller\n@RequestMapping(\"approval\")\npublic class ApprovalController {\n\n    private final ApprovalService approvalService;\n\n    public ApprovalController(ApprovalService approvalService) {\n        this.approvalService = approvalService;\n    }\n\n    @GetMapping\n    public String approvalForm(Model model) {\n        model.addAttribute(\"approval\", new ApprovalEntity());\n        return \"pages/provide-approval\";\n    }\n\n    @PostMapping\n    public String approvalSubmit(@ModelAttribute ApprovalEntity approval, @RequestParam(\"rut\") String rut, Model model) {\n        try {\n            model.addAttribute(\"approval\", approvalService.saveApproval(approval, rut));\n            return \"pages/approval-result\";\n        } catch (Exception e) {\n            model.addAttribute(\"approval\", approval);\n            model.addAttribute(\"error\", \"El rut ingresado no existe.\");\n            return \"pages/provide-approval\";\n        }\n    }\n}\n"
      },
      {
        "path": "src/main/java/cl/tingeso/mueblesstgo/controllers/ClockController.java",
        "content": "package cl.tingeso.mueblesstgo.controllers;\n\nimport cl.tingeso.mueblesstgo.services.ClockService;\nimport cl.tingeso.mueblesstgo.services.HRMService;\nimport org.springframework.stereotype.Controller;\nimport org.springframework.web.bind.annotation.GetMapping;\nimport org.springframework.web.bind.annotation.PostMapping;\nimport org.springframework.web.bind.annotation.RequestParam;\nimport org.springframework.web.multipart.MultipartFile;\nimport org.springframework.web.servlet.mvc.support.RedirectAttributes;\n\n@Controller\npublic class ClockController {\n\n    private final ClockService clockService;\n    private final HRMService hrmService;\n\n    public ClockController(ClockService clockService, HRMService hrmService) {\n        this.clockService = clockService;\n        this.hrmService = hrmService;\n    }\n\n    @GetMapping(\"/upload-clock\")\n    public String upload() {\n        return \"pages/upload-clock\";\n    }\n\n    @PostMapping(\"/save-clock\")\n    public String save(@RequestParam(\"file\") MultipartFile file, RedirectAttributes ms){\n        if (this.clockService.loadClock(file)) {\n            try {\n                this.hrmService.generateWages();\n                ms.addFlashAttribute(\"success\", \"Reloj cargado correctamente.\");\n                return \"redirect:upload-clock\";\n            } catch (Exception e) {\n                ms.addFlashAttribute(\"error\", \"Error al guardar el archivo.\");\n                return \"redirect:upload-clock\";\n            }\n        } else {\n            ms.addFlashAttribute(\"error\", \"El archivo no posee el nombre correcto.\");\n            return \"redirect:upload-clock\";\n        }\n    }\n}\n"
      } ];

    const dolos = new Dolos();
    const report = dolos.analyzeFromString(files);

    const pairs = (await report).allPairs();

    for (const pair of pairs) {
      console.log(`Pair ${pair.id}:`);
      console.log(`Lines: ${pair.leftFile.lines}`);
      console.log(`Lines: ${pair.rightFile.lines}`);
    }

    console.log(pairs);
  }
}